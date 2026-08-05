import { createClient } from '@supabase/supabase-js'
import { fakerFA as faker } from '@faker-js/faker'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL in .env.local")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
})

async function seed() {
  console.log("Seeding database (Persian)...")
  
  const demoEmail = "demo@nexacrm.app"
  const demoPassword = "Demo123456!"
  
  // Create or get Demo User
  let { data: userData } = await supabase.auth.admin.createUser({
    email: demoEmail,
    password: demoPassword,
    email_confirm: true,
    user_metadata: { full_name: "مدیر سیستم", avatar_url: faker.image.avatar() }
  })
  
  let userId = userData.user?.id
  if (!userId) {
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    userId = existingUsers?.users.find(u => u.email === demoEmail)?.id
  }

  if (!userId) {
    console.error("Could not find or create demo user")
    process.exit(1)
  }

  const { data: memberData } = await supabase.from('workspace_members').select('workspace_id').eq('user_id', userId).single()
  if (!memberData) {
    console.error("User has no workspace. The trigger might have failed.")
    process.exit(1)
  }
  const workspaceId = memberData.workspace_id
  
  console.log(`Using Workspace: ${workspaceId}`)

  console.log("Cleaning old data in workspace...")
  await supabase.from('activities').delete().eq('workspace_id', workspaceId)
  await supabase.from('tasks').delete().eq('workspace_id', workspaceId)
  await supabase.from('deals').delete().eq('workspace_id', workspaceId)
  await supabase.from('leads').delete().eq('workspace_id', workspaceId)
  await supabase.from('contacts').delete().eq('workspace_id', workspaceId)
  await supabase.from('companies').delete().eq('workspace_id', workspaceId)
  
  console.log("Creating team members...")
  const teamMemberIds: string[] = [userId]
  for (let i = 0; i < 5; i++) {
    const email = faker.internet.email()
    const { data: tmData } = await supabase.auth.admin.createUser({
      email,
      password: "Password123!",
      email_confirm: true,
      user_metadata: { full_name: faker.person.fullName(), avatar_url: faker.image.avatar() }
    })
    
    if (tmData.user?.id) {
      teamMemberIds.push(tmData.user.id)
      const { data: tmWsData } = await supabase.from('workspace_members').select('workspace_id').eq('user_id', tmData.user.id).single()
      if (tmWsData) await supabase.from('workspaces').delete().eq('id', tmWsData.workspace_id)
      
      await supabase.from('workspace_members').insert({
        workspace_id: workspaceId,
        user_id: tmData.user.id,
        role: i === 0 ? 'manager' : 'sales_rep'
      })
      
      await supabase.from('profiles').update({ job_title: i === 0 ? 'مدیر فروش' : 'کارشناس فروش' }).eq('id', tmData.user.id)
    }
  }

  console.log("Creating companies...")
  const companyIds: string[] = []
  for (let i = 0; i < 20; i++) {
    const { data } = await supabase.from('companies').insert({
      workspace_id: workspaceId,
      name: `شرکت ${faker.company.name()}`,
      domain: faker.internet.domainName(),
      industry: faker.helpers.arrayElement(['فناوری', 'سلامت', 'مالی', 'تولیدی', 'خرده‌فروشی']),
      size: faker.helpers.arrayElement(['۱-۱۰', '۱۱-۵۰', '۵۱-۲۰۰', '۲۰۱-۵۰۰', '۵۰۰+']),
      phone: faker.phone.number(),
      website: faker.internet.url(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: 'ایران',
      description: faker.lorem.paragraph(),
      owner_id: faker.helpers.arrayElement(teamMemberIds)
    }).select('id').single()
    if (data) companyIds.push(data.id)
  }

  console.log("Creating contacts...")
  const contactIds: string[] = []
  for (let i = 0; i < 40; i++) {
    const { data } = await supabase.from('contacts').insert({
      workspace_id: workspaceId,
      company_id: faker.helpers.arrayElement([...companyIds, null]),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      job_title: faker.person.jobTitle(),
      status: faker.helpers.arrayElement(['جدید', 'تماس گرفته شده', 'تایید شده', 'رد شده']),
      source: faker.helpers.arrayElement(['وب‌سایت', 'ارجاع', 'لینکدین', 'رویداد', 'تماس سرد']),
      owner_id: faker.helpers.arrayElement(teamMemberIds)
    }).select('id').single()
    if (data) contactIds.push(data.id)
  }

  console.log("Creating leads...")
  for (let i = 0; i < 35; i++) {
    await supabase.from('leads').insert({
      workspace_id: workspaceId,
      company_id: faker.helpers.arrayElement([...companyIds, null]),
      contact_id: faker.helpers.arrayElement([...contactIds, null]),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      source: faker.helpers.arrayElement(['وب‌سایت', 'ارجاع', 'لینکدین', 'کمپین', 'تماس سرد']),
      status: faker.helpers.arrayElement(['New', 'Qualified', 'Unqualified', 'Converted']),
      score: faker.number.int({ min: 25, max: 98 }),
      estimated_value: faker.number.int({ min: 15000000, max: 250000000 }),
      owner_id: faker.helpers.arrayElement(teamMemberIds)
    })
  }

  const { data: stages } = await supabase.from('pipeline_stages').select('id, pipeline_id').limit(7)
  if (stages && stages.length > 0) {
    const pipelineId = stages[0].pipeline_id
    console.log("Creating deals...")
    for (let i = 0; i < 25; i++) {
      const stage = faker.helpers.arrayElement(stages)
      await supabase.from('deals').insert({
        workspace_id: workspaceId,
        pipeline_id: pipelineId,
        stage_id: stage.id,
        company_id: faker.helpers.arrayElement([...companyIds, null]),
        primary_contact_id: faker.helpers.arrayElement([...contactIds, null]),
        title: `پروژه ${faker.commerce.productName()}`,
        value: faker.number.int({ min: 25000000, max: 850000000 }),
        probability: faker.number.int({ min: 20, max: 95 }),
        status: 'open',
        owner_id: faker.helpers.arrayElement(teamMemberIds),
        expected_close_date: faker.date.future().toISOString().split('T')[0]
      })
    }
  }

  console.log("Creating tasks...")
  for (let i = 0; i < 30; i++) {
    await supabase.from('tasks').insert({
      workspace_id: workspaceId,
      title: faker.lorem.words(4),
      description: faker.lorem.paragraph(),
      status: faker.helpers.arrayElement(['todo', 'in_progress', 'done']),
      priority: faker.helpers.arrayElement(['low', 'medium', 'high', 'urgent']),
      due_at: faker.date.soon().toISOString(),
      assignee_id: faker.helpers.arrayElement(teamMemberIds),
      created_by: userId
    })
  }

  console.log("Creating activities...")
  for (let i = 0; i < 50; i++) {
    await supabase.from('activities').insert({
      workspace_id: workspaceId,
      type: faker.helpers.arrayElement(['call', 'email', 'meeting', 'note']),
      content: faker.lorem.sentence(),
      created_by: faker.helpers.arrayElement(teamMemberIds)
    })
  }

  console.log("✅ Seeding complete!")
}

seed().catch(console.error)

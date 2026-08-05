import { createClient } from "@/utils/supabase/server"
import { KanbanBoard } from "@/components/pipeline/kanban-board"
import { CreateRecordButton } from "@/components/modals/create-button"

export default async function PipelinePage() {
  const supabase = await createClient()
  
  const { data: stages } = await supabase
    .from("pipeline_stages")
    .select("*")
    .order("order_index", { ascending: true })

  const { data: deals } = await supabase
    .from("deals")
    .select(`
      *,
      company:companies (name),
      owner:profiles!deals_owner_id_fkey (full_name, avatar_url)
    `)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-start">پایپ‌لاین</h1>
          <p className="text-muted-foreground mt-1 text-start">مدیریت و نمایش بصری معاملات فعال</p>
        </div>
        <CreateRecordButton entityType="deal" entityTitle="معامله" />
      </div>
      
      <KanbanBoard initialStages={stages || []} initialDeals={deals || []} />
    </div>
  )
}

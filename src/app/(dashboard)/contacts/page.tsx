import { createClient } from '@/utils/supabase/server';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { CreateRecordButton } from '@/components/modals/create-button';

export default async function ContactsPage() {
  const supabase = await createClient();

  const { data: contacts } = await supabase
    .from('contacts')
    .select('*, company:companies(name), owner:profiles!contacts_owner_id_fkey(full_name)')
    .order('created_at', { ascending: false });

  const formattedContacts = contacts?.map(c => ({
    ...c,
    companies: c.company,
    profiles: c.owner
  })) || [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-start">مخاطبین</h1>
          <p className="text-sm text-muted-foreground text-start">مدیریت افراد و ارتباطات</p>
        </div>
        <CreateRecordButton entityType="contact" entityTitle="مخاطب" />
      </div>

      <div className="rounded-xl border bg-white shadow-xs p-4">
        <DataTable columns={columns} data={formattedContacts} searchKey="name" />
      </div>
    </div>
  );
}

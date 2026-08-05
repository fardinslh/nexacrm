import { createClient } from '@/utils/supabase/server';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { CreateRecordButton } from '@/components/modals/create-button';

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data: leads } = await supabase
    .from('leads')
    .select('*, company:companies(name), owner:profiles!leads_owner_id_fkey(full_name)')
    .order('created_at', { ascending: false });

  const formattedLeads = leads?.map(lead => ({
    ...lead,
    companies: lead.company,
    profiles: lead.owner
  })) || [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-start">سرنخ‌ها</h1>
          <p className="text-sm text-muted-foreground text-start">مدیریت و پیگیری مشتریان بالقوه</p>
        </div>
        <CreateRecordButton entityType="lead" entityTitle="سرنخ" />
      </div>

      <div className="rounded-xl border bg-white shadow-xs p-4">
        <DataTable columns={columns} data={formattedLeads} searchKey="name" />
      </div>
    </div>
  );
}

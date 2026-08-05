import { createClient } from '@/utils/supabase/server';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { CreateRecordButton } from '@/components/modals/create-button';

export default async function CompaniesPage() {
  const supabase = await createClient();

  const { data: companies } = await supabase
    .from('companies')
    .select('*, owner:profiles!companies_owner_id_fkey(full_name)')
    .order('created_at', { ascending: false });

  const formattedCompanies = companies?.map(c => ({
    ...c,
    profiles: c.owner
  })) || [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-start">شرکت‌ها</h1>
          <p className="text-sm text-muted-foreground text-start">مدیریت سازمان‌ها و حساب‌ها</p>
        </div>
        <CreateRecordButton entityType="company" entityTitle="شرکت" />
      </div>

      <div className="rounded-xl border bg-white shadow-xs p-4">
        <DataTable columns={columns} data={formattedCompanies} searchKey="name" />
      </div>
    </div>
  );
}

import { createClient } from '@/utils/supabase/server';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { LayoutTemplate } from 'lucide-react';
import Link from 'next/link';
import { CreateRecordButton } from '@/components/modals/create-button';

export default async function DealsPage() {
  const supabase = await createClient();

  const { data: deals } = await supabase
    .from('deals')
    .select('*, company:companies(name), stage:pipeline_stages(name, color), owner:profiles!deals_owner_id_fkey(full_name)')
    .order('created_at', { ascending: false });

  const formattedDeals = deals?.map(d => ({
    ...d,
    companies: d.company,
    pipeline_stages: d.stage,
    profiles: d.owner
  })) || [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-start">معاملات</h1>
          <p className="text-sm text-muted-foreground text-start">پیگیری فرصت‌های فروش</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/pipeline">
            <Button variant="outline" className="gap-2 rounded-xl h-10 text-xs">
              <LayoutTemplate className="size-4" />
              نمای کانبان
            </Button>
          </Link>
          <CreateRecordButton entityType="deal" entityTitle="معامله" />
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-xs p-4">
        <DataTable columns={columns} data={formattedDeals} searchKey="title" />
      </div>
    </div>
  );
}

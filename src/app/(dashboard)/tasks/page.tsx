import { createClient } from '@/utils/supabase/server';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { CreateRecordButton } from '@/components/modals/create-button';

export default async function TasksPage() {
  const supabase = await createClient();

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*, assignee:profiles!tasks_assignee_id_fkey(full_name)')
    .order('created_at', { ascending: false });

  const formattedTasks = tasks?.map(task => ({
    ...task,
    profiles: task.assignee
  })) || [];

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-start">وظایف</h1>
          <p className="text-sm text-muted-foreground text-start">مدیریت کارها و یادآورها</p>
        </div>
        <CreateRecordButton entityType="task" entityTitle="وظیفه" />
      </div>

      <div className="rounded-xl border bg-white shadow-xs p-4">
        <DataTable columns={columns} data={formattedTasks} searchKey="title" />
      </div>
    </div>
  );
}

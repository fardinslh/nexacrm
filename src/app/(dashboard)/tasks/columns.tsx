'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { RecordModal, ModalType } from '@/components/modals/record-modal';

export type Task = {
  id: string;
  title: string;
  status: string;
  priority: string;
  due_date: string;
  profiles: { full_name: string } | null;
};

const priorityColors: Record<string, string> = {
  'low': 'bg-slate-100 text-slate-700',
  'medium': 'bg-blue-100 text-blue-700',
  'high': 'bg-amber-100 text-amber-700',
  'urgent': 'bg-rose-100 text-rose-700',
};

const priorityLabels: Record<string, string> = {
  'low': 'کم',
  'medium': 'متوسط',
  'high': 'زیاد',
  'urgent': 'فوری',
};

function TaskActions({ task }: { task: Task }) {
  const [modalType, setModalType] = useState<ModalType>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 size-8 transition-colors outline-none cursor-pointer">
          <span className="sr-only">باز کردن منو</span>
          <MoreHorizontal className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>عملیات</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => toast.success('وظیفه به عنوان انجام‌شده علامت‌گذاری شد ✅')}>
            علامت به عنوان انجام شده
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setModalType('view')}>
            مشاهده جزئیات
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModalType('edit')}>
            ویرایش
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-rose-600 focus:text-rose-700 focus:bg-rose-50"
            onClick={() => toast.error('وظیفه با موفقیت حذف شد')}
          >
            حذف وظیفه
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RecordModal
        type={modalType}
        entityType="task"
        entityTitle="وظیفه"
        data={task}
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
      />
    </>
  );
}

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() as boolean}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="انتخاب همه"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="انتخاب ردیف"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: 'وظیفه',
    cell: ({ row }) => {
      const isDone = row.original.status === 'done';
      return (
        <span className={`font-medium text-start block ${isDone ? 'line-through text-muted-foreground' : 'text-slate-900'}`}>
          {row.original.title}
        </span>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    cell: ({ row }) => (
      <span className="text-start block text-xs font-semibold text-slate-600">
        {row.original.status === 'done' ? 'انجام شده' : row.original.status === 'in_progress' ? 'در حال انجام' : 'لیست کارها'}
      </span>
    ),
  },
  {
    accessorKey: 'priority',
    header: 'اولویت',
    cell: ({ row }) => {
      const priority = row.original.priority;
      return (
        <Badge variant="secondary" className={priorityColors[priority] || 'bg-gray-100'}>
          {priorityLabels[priority] || priority}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'due_date',
    header: 'سررسید',
    cell: ({ row }) => {
      const date = row.original.due_date;
      return <span className="text-start block text-xs text-muted-foreground">{date ? format(new Date(date), 'yyyy/MM/dd') : '-'}</span>;
    },
  },
  {
    accessorKey: 'profiles',
    header: 'مسئول',
    cell: ({ row }) => <span className="text-start block">{row.original.profiles?.full_name || '-'}</span>,
  },
  {
    id: 'actions',
    header: 'عملیات',
    cell: ({ row }) => <TaskActions task={row.original} />,
  },
];

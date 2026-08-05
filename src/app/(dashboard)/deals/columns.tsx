'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
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

export type Deal = {
  id: string;
  title: string;
  value: number;
  probability: number;
  status: string;
  expected_close_date: string;
  companies: { name: string } | null;
  profiles: { full_name: string } | null;
  pipeline_stages: { name: string; color: string } | null;
};

function DealActions({ deal }: { deal: Deal }) {
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
          <DropdownMenuItem
            onClick={(e) => {
              e.stopPropagation();
              if (typeof window !== 'undefined' && navigator?.clipboard?.writeText) {
                navigator.clipboard.writeText(deal.id).catch(() => {});
                toast.success('شناسه با موفقیت کپی شد 📋');
              } else {
                toast.info(`شناسه: ${deal.id}`);
              }
            }}
          >
            کپی شناسه
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setModalType('view')}>
            مشاهده جزئیات
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModalType('edit')}>
            ویرایش
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RecordModal
        type={modalType}
        entityType="deal"
        entityTitle="معامله"
        data={deal}
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
      />
    </>
  );
}

export const columns: ColumnDef<Deal>[] = [
  {
    accessorKey: 'title',
    header: 'عنوان معامله',
    cell: ({ row }) => <span className="font-semibold text-slate-900 text-start block">{row.original.title}</span>,
  },
  {
    accessorKey: 'value',
    header: 'مبلغ',
    cell: ({ row }) => {
      const amount = parseFloat(row.original.value?.toString() || '0');
      return <span className="font-extrabold text-emerald-600 text-start block">{amount.toLocaleString()} تومان</span>;
    },
  },
  {
    accessorKey: 'pipeline_stages',
    header: 'مرحله',
    cell: ({ row }) => {
      const stage = row.original.pipeline_stages;
      if (!stage) return <span>-</span>;
      return (
        <Badge variant="outline" style={{ borderColor: stage.color, color: stage.color }}>
          {stage.name}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'probability',
    header: 'احتمال (%)',
    cell: ({ row }) => <span className="text-start block font-medium">{row.original.probability}%</span>,
  },
  {
    accessorKey: 'companies',
    header: 'شرکت',
    cell: ({ row }) => <span className="text-start block">{row.original.companies?.name || '-'}</span>,
  },
  {
    accessorKey: 'expected_close_date',
    header: 'تاریخ بسته شدن',
    cell: ({ row }) => {
      const date = row.original.expected_close_date;
      return <span className="text-start block text-muted-foreground">{date ? format(new Date(date), 'yyyy/MM/dd') : '-'}</span>;
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
    cell: ({ row }) => <DealActions deal={row.original} />,
  },
];

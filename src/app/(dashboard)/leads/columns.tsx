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
import { RecordModal, ModalType } from '@/components/modals/record-modal';

export type Lead = {
  id: string;
  name: string;
  email: string;
  status: string;
  score: number;
  companies: { name: string } | null;
  profiles: { full_name: string } | null;
};

const statusColors: Record<string, string> = {
  'جدید': 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  'تماس گرفته': 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  'تایید شده': 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100',
  'رد شده': 'bg-rose-100 text-rose-700 hover:bg-rose-100',
  'تبدیل شده': 'bg-violet-100 text-violet-700 hover:bg-violet-100',
};

function LeadActions({ lead }: { lead: Lead }) {
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
                navigator.clipboard.writeText(lead.id).catch(() => {});
                toast.success('شناسه با موفقیت کپی شد 📋');
              } else {
                toast.info(`شناسه: ${lead.id}`);
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
        entityType="lead"
        entityTitle="سرنخ"
        data={lead}
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
      />
    </>
  );
}

export const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: 'name',
    header: 'نام',
    cell: ({ row }) => (
      <div className="flex flex-col text-start">
        <span className="font-medium">{row.original.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.email}</span>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant="secondary" className={statusColors[status] || 'bg-gray-100 text-gray-700'}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'score',
    header: 'امتیاز',
    cell: ({ row }) => {
      const score = row.original.score || 0;
      return (
        <div className="flex items-center gap-2">
          <div className="h-2 w-16 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-primary"
              style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{score}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'companies',
    header: 'شرکت',
    cell: ({ row }) => row.original.companies?.name || '-',
  },
  {
    accessorKey: 'profiles',
    header: 'مسئول',
    cell: ({ row }) => row.original.profiles?.full_name || '-',
  },
  {
    id: 'actions',
    header: 'عملیات',
    cell: ({ row }) => <LeadActions lead={row.original} />,
  },
];

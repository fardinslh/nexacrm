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

export type Company = {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  profiles: { full_name: string } | null;
};

function CompanyActions({ company }: { company: Company }) {
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
                navigator.clipboard.writeText(company.id).catch(() => {});
                toast.success('شناسه با موفقیت کپی شد 📋');
              } else {
                toast.info(`شناسه: ${company.id}`);
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
        entityType="company"
        entityTitle="شرکت"
        data={company}
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
      />
    </>
  );
}

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: 'name',
    header: 'نام شرکت',
    cell: ({ row }) => (
      <div className="flex flex-col text-start">
        <span className="font-medium text-slate-900">{row.original.name}</span>
        <span className="text-xs text-muted-foreground">{row.original.domain}</span>
      </div>
    ),
  },
  {
    accessorKey: 'industry',
    header: 'صنعت',
    cell: ({ row }) => <span className="text-start">{row.original.industry || '-'}</span>,
  },
  {
    accessorKey: 'size',
    header: 'اندازه',
    cell: ({ row }) => (
      <Badge variant="outline" className="font-normal bg-slate-50 text-slate-700 border-slate-200">
        {row.original.size || '-'}
      </Badge>
    ),
  },
  {
    accessorKey: 'profiles',
    header: 'مسئول',
    cell: ({ row }) => <span className="text-start">{row.original.profiles?.full_name || '-'}</span>,
  },
  {
    id: 'actions',
    header: 'عملیات',
    cell: ({ row }) => <CompanyActions company={row.original} />,
  },
];

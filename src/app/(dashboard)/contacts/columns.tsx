'use client';

import React, { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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

export type Contact = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  job_title: string;
  companies: { name: string } | null;
  profiles: { full_name: string } | null;
};

function ContactActions({ contact }: { contact: Contact }) {
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
                navigator.clipboard.writeText(contact.id).catch(() => {});
                toast.success('شناسه با موفقیت کپی شد 📋');
              } else {
                toast.info(`شناسه: ${contact.id}`);
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
        entityType="contact"
        entityTitle="مخاطب"
        data={{
          ...contact,
          name: `${contact.first_name || ''} ${contact.last_name || ''}`
        }}
        isOpen={!!modalType}
        onClose={() => setModalType(null)}
      />
    </>
  );
}

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: 'name',
    header: 'نام',
    cell: ({ row }) => {
      const contact = row.original;
      const fullName = `${contact.first_name || ''} ${contact.last_name || ''}`;
      const initials = `${contact.first_name?.[0] || ''}${contact.last_name?.[0] || ''}`;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-start">
            <span className="font-medium text-slate-900">{fullName}</span>
            <span className="text-xs text-muted-foreground">{contact.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'job_title',
    header: 'عنوان شغلی',
    cell: ({ row }) => <span className="text-start">{row.original.job_title || '-'}</span>,
  },
  {
    accessorKey: 'companies',
    header: 'شرکت',
    cell: ({ row }) => <span className="text-start">{row.original.companies?.name || '-'}</span>,
  },
  {
    accessorKey: 'profiles',
    header: 'مسئول',
    cell: ({ row }) => <span className="text-start">{row.original.profiles?.full_name || '-'}</span>,
  },
  {
    id: 'actions',
    header: 'عملیات',
    cell: ({ row }) => <ContactActions contact={row.original} />,
  },
];

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RecordModal } from "@/components/modals/record-modal";

interface CreateRecordButtonProps {
  entityType: "lead" | "contact" | "company" | "deal" | "task";
  entityTitle: string;
}

export function CreateRecordButton({ entityType, entityTitle }: CreateRecordButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-500/20 gap-2 h-10 text-xs px-4 transition-all cursor-pointer"
      >
        <Plus className="size-4" />
        <span>{entityTitle} جدید</span>
      </Button>

      <RecordModal
        type="create"
        entityType={entityType}
        entityTitle={entityTitle}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

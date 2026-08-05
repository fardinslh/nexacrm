"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Building2, CalendarIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface KanbanCardProps {
  deal: any
  isOverlay?: boolean
}

export function KanbanCard({ deal, isOverlay }: KanbanCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: deal.id,
    data: {
      type: "Deal",
      deal,
    },
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-[140px] w-full rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 opacity-30"
      />
    )
  }

  const dateString = deal.expected_close_date ? new Date(deal.expected_close_date).toISOString().split('T')[0].replace(/-/g, '/') : ''

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/30 transition-colors",
        isOverlay && "rotate-2 shadow-xl ring-1 ring-primary/20 cursor-grabbing"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-sm line-clamp-2">{deal.title}</h4>
        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500 whitespace-nowrap">
          {deal.value?.toLocaleString()} تومان
        </span>
      </div>

      <div className="flex flex-col gap-1.5 text-xs text-muted-foreground">
        {deal.company?.name && (
          <div className="flex items-center gap-1.5">
            <Building2 className="size-4" />
            <span className="truncate">{deal.company.name}</span>
          </div>
        )}
        {dateString && (
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="size-4" />
            <span>{dateString}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 border-t mt-auto">
        <div className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
          {deal.probability}٪ احتمال
        </div>
        <Avatar className="size-6">
          <AvatarImage src={deal.owner?.avatar_url} />
          <AvatarFallback className="text-[10px]">
            {deal.owner?.name?.substring(0, 2) || "U"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

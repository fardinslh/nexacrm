"use client"

import { useMemo } from "react"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanCard } from "./kanban-card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface KanbanColumnProps {
  stage: any
  deals: any[]
}

const colorMap: Record<string, string> = {
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
}

export function KanbanColumn({ stage, deals }: KanbanColumnProps) {
  const dealIds = useMemo(() => deals.map((d) => d.id), [deals])
  
  const { setNodeRef, isOver } = useDroppable({
    id: stage.id,
    data: {
      type: "Column",
      stage,
    },
  })

  const totalValue = deals.reduce((acc, deal) => acc + (deal.value || 0), 0)
  const dotColor = colorMap[stage.color || "blue"] || "bg-blue-500"

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex h-full w-[350px] min-w-[350px] flex-col gap-4 rounded-xl border bg-card/50 p-4 transition-colors",
        isOver && "bg-primary/5 border-primary/20"
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("size-2.5 rounded-full", dotColor)} />
          <h3 className="font-semibold">{stage.name}</h3>
          <Badge variant="secondary" className="rounded-md px-1.5 font-normal">
            {deals.length}
          </Badge>
        </div>
        <span className="text-sm text-muted-foreground font-medium">
          {totalValue.toLocaleString()} تومان
        </span>
      </div>

      <div className="flex flex-col gap-3 flex-1 min-h-[150px]">
        <SortableContext items={dealIds} strategy={verticalListSortingStrategy}>
          {deals.map((deal) => (
            <KanbanCard key={deal.id} deal={deal} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

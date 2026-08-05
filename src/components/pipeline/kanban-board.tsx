"use client"

import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { KanbanColumn } from "./kanban-column"
import { KanbanCard } from "./kanban-card"
import { toast } from "sonner"
import { createClient } from "@/utils/supabase/client"

interface KanbanBoardProps {
  initialStages: any[]
  initialDeals: any[]
}

export function KanbanBoard({ initialStages, initialDeals }: KanbanBoardProps) {
  const [stages] = useState(initialStages)
  const [deals, setDeals] = useState(initialDeals)
  const [activeDeal, setActiveDeal] = useState<any | null>(null)
  
  const supabase = createClient()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const deal = deals.find((d) => d.id === active.id)
    if (deal) setActiveDeal(deal)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveDeal = active.data.current?.type === "Deal"
    
    if (!isActiveDeal) return
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event
    setActiveDeal(null)

    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveDeal = active.data.current?.type === "Deal"
    const isOverColumn = over.data.current?.type === "Column"
    const isOverDeal = over.data.current?.type === "Deal"

    if (!isActiveDeal) return

    let newStageId = ""

    if (isOverColumn) {
      newStageId = overId as string
    } else if (isOverDeal) {
      const overDeal = deals.find((d) => d.id === overId)
      if (overDeal) newStageId = overDeal.stage_id
    }

    if (!newStageId) return

    const activeDeal = deals.find((d) => d.id === activeId)
    if (activeDeal?.stage_id === newStageId) return

    // Optimistic update
    setDeals((prev) =>
      prev.map((d) =>
        d.id === activeId ? { ...d, stage_id: newStageId } : d
      )
    )

    const { error } = await supabase
      .from("deals")
      .update({ stage_id: newStageId })
      .eq("id", activeId)

    if (error) {
      toast.error("خطا در به‌روزرسانی مرحله معامله")
      // Revert on error
      setDeals((prev) =>
        prev.map((d) =>
          d.id === activeId ? { ...d, stage_id: activeDeal!.stage_id } : d
        )
      )
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex w-full gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <KanbanColumn
            key={stage.id}
            stage={stage}
            deals={deals.filter((d) => d.stage_id === stage.id)}
          />
        ))}
      </div>
      <DragOverlay>
        {activeDeal ? <KanbanCard deal={activeDeal} isOverlay /> : null}
      </DragOverlay>
    </DndContext>
  )
}

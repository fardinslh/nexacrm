"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { User, Building2, Mail, Phone, Tag, DollarSign, Plus } from "lucide-react";

export type ModalType = "view" | "edit" | "create" | null;

interface RecordModalProps {
  type: ModalType;
  entityType: "lead" | "contact" | "company" | "deal" | "task";
  entityTitle: string;
  data?: any;
  isOpen: boolean;
  onClose: () => void;
}

export function RecordModal({
  type,
  entityType,
  entityTitle,
  data,
  isOpen,
  onClose,
}: RecordModalProps) {
  const [formData, setFormData] = useState<any>(data || {});
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setFormData(data || {});
  }, [data]);

  if (!isOpen || !type) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (type === "create") {
        toast.success(`${entityTitle} جدید با موفقیت ثبت شد 🚀`);
      } else if (type === "edit") {
        toast.success(`اطلاعات ${entityTitle} با موفقیت به‌روزرسانی شد ✨`);
      }
      onClose();
    }, 400);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg bg-white border-slate-200 shadow-2xl rounded-2xl p-6">
        
        {/* Modal Header */}
        <DialogHeader className="space-y-1.5 pb-3 border-b border-slate-100 text-start">
          <DialogTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
            {type === "view" && <User className="size-5 text-indigo-600" />}
            {type === "edit" && <Tag className="size-5 text-indigo-600" />}
            {type === "create" && <Plus className="size-5 text-indigo-600" />}
            <span>
              {type === "view" && `جزئیات ${entityTitle}`}
              {type === "edit" && `ویرایش ${entityTitle}`}
              {type === "create" && `افزودن ${entityTitle} جدید`}
            </span>
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            {type === "view" && "اطلاعات کامل پرونده ثبت‌شده در سیستم"}
            {type === "edit" && "مشخصات را تغییر داده و ثبت کنید"}
            {type === "create" && "فیلدهای زیر را برای ثبت رکورد جدید تکمیل نمایید"}
          </DialogDescription>
        </DialogHeader>

        {/* View Details Content */}
        {type === "view" && (
          <div className="space-y-4 py-2 text-start">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 block">عنوان / نام</span>
                <span className="text-xs font-bold text-slate-900 block">
                  {data?.name || data?.title || `${data?.first_name || ''} ${data?.last_name || ''}`}
                </span>
              </div>
              <div className="space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 block">شناسه (ID)</span>
                <span className="text-[11px] font-mono text-slate-600 truncate block">
                  {data?.id || "NEXA-8492"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {(data?.email || true) && (
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Mail className="size-3.5 text-indigo-500" /> ایمیل
                  </span>
                  <span className="font-medium text-slate-900">{data?.email || "contact@nexacrm.app"}</span>
                </div>
              )}
              {(data?.phone || true) && (
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Phone className="size-3.5 text-indigo-500" /> تلفن تماس
                  </span>
                  <span className="font-medium text-slate-900" dir="ltr">{data?.phone || "۰۲۱-۸۸۹۹۲۲۱۱"}</span>
                </div>
              )}
              {data?.companies?.name && (
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Building2 className="size-3.5 text-indigo-500" /> شرکت مربوطه
                  </span>
                  <span className="font-medium text-slate-900">{data.companies.name}</span>
                </div>
              )}
              {data?.value && (
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <DollarSign className="size-3.5 text-emerald-500" /> ارزش معامله
                  </span>
                  <span className="font-extrabold text-emerald-600">{Number(data.value).toLocaleString()} تومان</span>
                </div>
              )}
              {data?.status && (
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-slate-100">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Tag className="size-3.5 text-indigo-500" /> وضعیت
                  </span>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                    {data.status}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit or Create Form */}
        {(type === "edit" || type === "create") && (
          <form onSubmit={handleSave} className="space-y-4 py-2 text-start">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">نام / عنوان {entityTitle}</Label>
              <Input
                required
                value={formData.name || formData.title || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value, title: e.target.value })}
                placeholder={`عنوان ${entityTitle}...`}
                className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">ایمیل</Label>
                <Input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200 focus:bg-white text-start"
                  dir="ltr"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-700">تلفن تماس</Label>
                <Input
                  value={formData.phone || ""}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="۰۹۱۲..."
                  className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200 focus:bg-white text-start"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-700">وضعیت</Label>
              <Input
                value={formData.status || "جدید"}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                placeholder="جدید / تایید شده / در حال بررسی..."
                className="h-9 text-xs rounded-xl bg-slate-50 border-slate-200 focus:bg-white"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-slate-100 gap-2 flex justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="h-9 text-xs rounded-xl border-slate-200"
              >
                انصراف
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="h-9 text-xs rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4"
              >
                {loading ? "در حال ثبت..." : type === "create" ? "ثبت رکورد" : "ذخیره تغییرات"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {type === "view" && (
          <DialogFooter className="pt-3 border-t border-slate-100 flex justify-end">
            <Button
              type="button"
              onClick={onClose}
              className="h-9 text-xs rounded-xl bg-slate-900 text-white font-bold px-5"
            >
              بستن
            </Button>
          </DialogFooter>
        )}

      </DialogContent>
    </Dialog>
  );
}

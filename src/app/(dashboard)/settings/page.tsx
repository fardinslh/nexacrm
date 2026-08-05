import { Card, CardContent } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 p-6 h-[80vh]">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-start">تنظیمات</h1>
        <p className="text-sm text-muted-foreground text-start">مدیریت فضای کاری و ترجیحات</p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Card className="shadow-sm border-gray-100 w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-12 gap-4">
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <Settings className="size-8" />
            </div>
            <h2 className="text-xl font-semibold">به زودی</h2>
            <p className="text-muted-foreground text-center text-sm">
              بخش تنظیمات سیستم در حال توسعه است و به زودی در دسترس قرار می‌گیرد.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

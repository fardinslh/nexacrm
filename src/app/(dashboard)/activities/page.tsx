import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Users, FileText, CheckSquare, Settings } from 'lucide-react';

const mockActivities = [
  {
    id: 1,
    type: 'تماس',
    user: 'علی احمدی',
    content: 'تماس با مشتری برای پیگیری پیش‌فاکتور',
    time: '۲ ساعت پیش',
    icon: Phone,
    color: 'text-blue-500 bg-blue-100',
  },
  {
    id: 2,
    type: 'ایمیل',
    user: 'سارا کریمی',
    content: 'ارسال پروپوزال جدید به شرکت الف',
    time: '۵ ساعت پیش',
    icon: Mail,
    color: 'text-emerald-500 bg-emerald-100',
  },
  {
    id: 3,
    type: 'جلسه',
    user: 'محمد رضایی',
    content: 'جلسه معارفه با تیم فنی مشتری',
    time: 'دیروز',
    icon: Users,
    color: 'text-violet-500 bg-violet-100',
  },
  {
    id: 4,
    type: 'یادداشت',
    user: 'علی احمدی',
    content: 'مشتری درخواست تخفیف ۱۰ درصدی دارد',
    time: 'دیروز',
    icon: FileText,
    color: 'text-amber-500 bg-amber-100',
  },
];

export default function ActivitiesPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-start">فعالیت‌ها</h1>
        <p className="text-sm text-muted-foreground text-start">آخرین رویدادها و اقدامات</p>
      </div>

      <div className="flex flex-col gap-4 max-w-3xl">
        {mockActivities.map((activity) => (
          <Card key={activity.id} className="shadow-sm border-gray-100">
            <CardContent className="p-4 flex items-start gap-4">
              <div className={`p-2 rounded-full ${activity.color}`}>
                <activity.icon className="size-5" />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-start">
                    {activity.user}
                    <span className="text-muted-foreground font-normal mx-1">یک {activity.type} ثبت کرد</span>
                  </span>
                  <span className="text-xs text-muted-foreground" dir="ltr">{activity.time}</span>
                </div>
                <p className="text-sm text-gray-700 text-start">{activity.content}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

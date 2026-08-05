import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  DollarSign, 
  Briefcase, 
  TrendingUp, 
  Target, 
  Sparkles, 
  Plus, 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Users, 
  Zap,
  Building2,
  ChevronLeft
} from "lucide-react"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { PipelineChart } from "@/components/dashboard/pipeline-chart"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white p-6 md:p-8 shadow-lg shadow-indigo-500/15">
        <div className="absolute top-0 end-0 -mt-8 -me-8 size-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 -mb-8 -ms-8 size-64 rounded-full bg-violet-400/20 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs px-2.5 py-0.5 backdrop-blur-md">
                <Sparkles className="size-3 me-1 text-amber-300" /> مرکز فرماندهی فروش
              </Badge>
              <span className="text-xs text-indigo-100 flex items-center gap-1">
                <Calendar className="size-3" /> ۱۵ مرداد ۱۴۰۵
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              سلام، مدیر ارشد! 🚀
            </h1>
            <p className="text-sm text-indigo-100 max-w-xl leading-relaxed">
              عملکرد تیم شما در این ماه <span className="text-amber-300 font-semibold">+۲۰.۱٪ رشد</span> داشته است. ۴۲ معامله فعال به ارزش کل <span className="text-amber-300 font-semibold">۸,۴۵۰,۰۰۰,۰۰۰ تومان</span> در جریان است.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/leads">
              <Button size="sm" className="bg-white text-indigo-900 hover:bg-slate-100 font-bold shadow-md rounded-xl h-10 px-4 gap-2 text-xs transition-all">
                <Plus className="size-4 text-indigo-600" />
                <span>ثبت سرنخ جدید</span>
              </Button>
            </Link>
            <Link href="/pipeline">
              <Button variant="outline" size="sm" className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md font-medium rounded-xl h-10 px-4 text-xs transition-all">
                <span>مشاهده پایپ‌لاین</span>
                <ChevronLeft className="size-4 ms-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Goal Target Progress Strip */}
        <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-3 space-y-2">
            <div className="flex justify-between items-center text-xs font-medium text-indigo-100">
              <span className="flex items-center gap-1.5 font-semibold">
                <Zap className="size-3.5 text-amber-300" /> تارگت فروش سه‌ماهه سوم
              </span>
              <span className="font-bold text-amber-300">۳,۹۰۰,۰۰۰,۰۰۰ تومان از ۵,۰۰۰,۰۰۰,۰۰۰ تومان (۷۸٪ تکمیل شده)</span>
            </div>
            <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/20">
              <div className="h-full bg-gradient-to-r from-amber-300 to-emerald-300 rounded-full transition-all duration-1000 shadow-sm" style={{ width: '78%' }} />
            </div>
          </div>
          <div className="text-start md:text-end text-xs text-indigo-100 font-medium bg-white/10 p-2.5 rounded-xl border border-white/20 backdrop-blur-md">
            <span>پیش‌بینی بسته‌شدن: </span>
            <span className="font-bold text-amber-300">۹۲٪ احتمال تحقیق</span>
          </div>
        </div>
      </div>

      {/* 4 Executive Metric Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Card 1 */}
        <Card className="relative overflow-hidden bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500">کل درآمد کسب‌شده</CardTitle>
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 shadow-2xs">
              <DollarSign className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="text-xl font-extrabold tracking-tight text-slate-900">۲,۴۵۰,۰۰۰,۰۰۰ <span className="text-xs font-normal text-slate-500">تومان</span></div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[11px] font-semibold flex items-center gap-0.5">
                <ArrowUpRight className="size-3" /> +۲۰.۱٪
              </Badge>
            </div>
            {/* Sparkline Visual */}
            <div className="flex items-center gap-1 h-3 pt-1">
              {[40, 55, 35, 60, 75, 65, 85, 95].map((val, idx) => (
                <div key={idx} className="flex-1 bg-emerald-100 rounded-xs overflow-hidden h-full flex items-end">
                  <div className="w-full bg-emerald-500 rounded-xs" style={{ height: `${val}%` }} />
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 font-medium">نسبت به دوره مشابه ماه قبل</p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="relative overflow-hidden bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500">معاملات فعال در جریان</CardTitle>
            <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/60 shadow-2xs">
              <Briefcase className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-extrabold tracking-tight text-slate-900">۴۲ معامله</div>
              <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[11px] font-semibold">
                ارزش: ۸.۴۵ میلیارد تومان
              </Badge>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '65%' }} />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">+۱۲ معامله جدید ثبت‌شده این هفته</p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="relative overflow-hidden bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500">نرخ موفقیت (Win Rate)</CardTitle>
            <div className="flex size-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600 border border-violet-200/60 shadow-2xs">
              <Target className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-extrabold tracking-tight text-slate-900">۶۸.۴٪</div>
              <Badge className="bg-violet-50 text-violet-700 border-violet-200 text-[11px] font-semibold">
                +۴٪ اهداف
              </Badge>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-violet-600 rounded-full" style={{ width: '68%' }} />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">بالاتر از میانگین صنعت (۵۵٪)</p>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="relative overflow-hidden bg-white border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate-500">میانگین چرخه فروش</CardTitle>
            <div className="flex size-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60 shadow-2xs">
              <Clock className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-extrabold tracking-tight text-slate-900">۱۴ روز</div>
              <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[11px] font-semibold">
                ۲.۵ روز سریع‌تر
              </Badge>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '80%' }} />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">بهینه‌سازی ۱۵٪ سرعت بستن</p>
          </CardContent>
        </Card>

      </div>

      {/* Main Charts Analytics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Revenue Chart */}
        <Card className="lg:col-span-4 bg-white border-slate-200/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">تحلیل روند درآمد و فروش</CardTitle>
              <CardDescription className="text-xs text-slate-500 mt-0.5">مقایسه فروش ماه‌های اخیر بر حسب میلیون تومان</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs font-medium text-slate-600 border-slate-200">
              ۷ ماه اخیر
            </Badge>
          </CardHeader>
          <CardContent className="ps-0 pt-4">
            <RevenueChart />
          </CardContent>
        </Card>

        {/* Pipeline Chart */}
        <Card className="lg:col-span-3 bg-white border-slate-200/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <CardTitle className="text-base font-bold text-slate-900">توزیع مراحل پایپ‌لاین</CardTitle>
              <CardDescription className="text-xs text-slate-500 mt-0.5">تعداد معاملات در مراحل مختلف فروش</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <PipelineChart />
          </CardContent>
        </Card>

      </div>

      {/* Complex Bottom Widgets: Live Activity & Top Opportunities */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Live Activity Feed */}
        <Card className="lg:col-span-4 bg-white border-slate-200/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <CardTitle className="text-base font-bold text-slate-900">فید زنده فعالیت‌های اخیر</CardTitle>
            </div>
            <Link href="/activities">
              <Button variant="ghost" size="sm" className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium">
                مشاهده همه
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-4 px-6">
            <div className="space-y-4">
              
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0 mt-0.5">
                  <Phone className="size-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">رضا احمدی</span>
                    <span className="text-[11px] text-slate-400">۱۰ دقیقه پیش</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    تماس تلفنی با شرکت <span className="font-semibold text-slate-800">تکنولوژی آریا</span> برقراری شد. درخواست پیش‌فاکتور جدید ارائه دادند.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0 mt-0.5">
                  <CheckCircle2 className="size-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">سارا محمدی</span>
                    <span className="text-[11px] text-slate-400">۴۵ دقیقه پیش</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    معامله <span className="font-semibold text-slate-800">توسعه سامانه مدیریت</span> به ارزش <span className="font-bold text-emerald-600">۴۵۰,۰۰۰,۰۰۰ تومان</span> به مرحله برنده منتقل شد. 🎉
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="p-2 rounded-lg bg-violet-50 text-violet-600 border border-violet-100 shrink-0 mt-0.5">
                  <Users className="size-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">علی حسینی</span>
                    <span className="text-[11px] text-slate-400">۲ ساعت پیش</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    جلسه حضوری با مدیران <span className="font-semibold text-slate-800">گروه صنعتی پارس</span> برگزار شد. دمو محصول با موفقیت انجام شد.
                  </p>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Top Active Deals */}
        <Card className="lg:col-span-3 bg-white border-slate-200/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-900">فرصت‌های اصلی در جریان</CardTitle>
            <Link href="/deals">
              <Button variant="ghost" size="sm" className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium">
                مدیریت معاملات
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="pt-4 px-6">
            <div className="space-y-3.5">
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 block">پروژه مشاوره دیجیتال</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Building2 className="size-3" /> صنایع فولاد البرز
                  </span>
                </div>
                <div className="text-end space-y-1">
                  <span className="text-xs font-extrabold text-slate-900 block">۵۸۰,۰۰۰,۰۰۰ تومان</span>
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] py-0">
                    ۸۵٪ احتمال
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 block">قرارداد سالانه CRM</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Building2 className="size-3" /> شرکت داده گستر
                  </span>
                </div>
                <div className="text-end space-y-1">
                  <span className="text-xs font-extrabold text-slate-900 block">۳۲۵,۰۰۰,۰۰۰ تومان</span>
                  <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 text-[10px] py-0">
                    ۷۰٪ احتمال
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 block">پیاده‌سازی زیرساخت</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Building2 className="size-3" /> بازرگانی سینا
                  </span>
                </div>
                <div className="text-end space-y-1">
                  <span className="text-xs font-extrabold text-slate-900 block">۲۴۰,۰۰۰,۰۰۰ تومان</span>
                  <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] py-0">
                    ۵۰٪ احتمال
                  </Badge>
                </div>
              </div>

            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  )
}


import { Bell, Search, Plus, Sparkles } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl px-6 transition-all">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ms-2 text-slate-500 hover:text-slate-900 transition-colors" />
        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-100/80 rounded-full border border-slate-200/60 text-xs font-medium text-slate-600">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
          </span>
          <span>نسخه سازمانی | دیجیتال نورث‌استار</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative w-64 lg:w-80 hidden sm:flex items-center">
          <Search className="absolute start-3 size-4 text-slate-400" />
          <Input 
            type="search" 
            placeholder="جستجو در سرنخ‌ها، مخاطبین..." 
            className="w-full ps-9 pe-12 bg-slate-100/60 border-slate-200/60 shadow-none focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500 rounded-xl h-9 text-xs transition-all"
          />
          <span className="absolute end-2.5 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white rounded border border-slate-200 shadow-2xs pointer-events-none">⌘K</span>
        </div>
        
        <Link href="/deals">
          <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-500/20 rounded-xl font-medium gap-1.5 h-9 text-xs transition-all">
            <Plus className="size-4" />
            <span>ثبت معامله</span>
          </Button>
        </Link>
        
        <div className="flex items-center gap-2 border-s border-slate-200/60 ps-3">
          <Button variant="ghost" size="icon" className="relative rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100">
            <Bell className="size-4" />
            <span className="absolute top-2 end-2 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </Button>
          <div className="flex items-center gap-2.5 ms-1">
            <div className="size-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-sm">
              <div className="size-full bg-white rounded-[10px] flex items-center justify-center font-bold text-xs text-indigo-600">
                ان
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Activity,
  BarChart3,
  Briefcase,
  Building2,
  CheckSquare,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'داشبورد', href: '/dashboard', icon: LayoutDashboard },
  { name: 'سرنخ‌ها', href: '/leads', icon: Target },
  { name: 'مخاطبین', href: '/contacts', icon: Users },
  { name: 'شرکت‌ها', href: '/companies', icon: Building2 },
  { name: 'پایپ‌لاین', href: '/pipeline', icon: FolderKanban },
  { name: 'معاملات', href: '/deals', icon: Briefcase },
  { name: 'وظایف', href: '/tasks', icon: CheckSquare },
  { name: 'فعالیت‌ها', href: '/activities', icon: Activity },
  { name: 'گزارش‌ها', href: '/reports', icon: BarChart3 },
  { name: 'تنظیمات', href: '/settings', icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="right" variant="sidebar" className="border-s border-slate-200/80 bg-white text-slate-900">
      <SidebarHeader className="flex flex-row items-center gap-3 px-4 py-6 border-b border-slate-200/60 bg-white">
        <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 size-10 shadow-md shadow-indigo-500/20">
          <Sparkles className="size-5 text-white" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-extrabold text-lg leading-none tracking-tight text-slate-900">NexaCRM</span>
          <span className="text-xs text-slate-500 font-semibold">دیجیتال نورث‌استار</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[11px] font-bold text-slate-400 mt-4 mb-2 text-start tracking-wider uppercase">
            منوی اصلی
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 space-y-1.5">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      isActive={isActive}
                      className={cn(
                        'flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 text-start w-full font-semibold text-xs',
                        isActive 
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25 font-bold' 
                          : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                      )}
                    >
                      <Link href={item.href} className="flex items-center gap-3 w-full">
                        <item.icon className={cn("size-4 shrink-0", isActive ? "text-white" : "text-slate-500")} />
                        <span className={cn(isActive ? "text-white font-bold" : "text-slate-800")}>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

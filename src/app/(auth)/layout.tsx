import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Right Side / Form Area (appears on the right in RTL) */}
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          {children}
        </div>
      </div>

      {/* Left Side / Decorative Panel (appears on the left in RTL) */}
      <div className="relative hidden w-0 flex-1 lg:block bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-violet-900/60 to-zinc-900/90 z-10" />
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="size-6 text-indigo-400" />
            <span className="text-xl font-bold tracking-tight">نکسا سی‌آرام (NexaCRM)</span>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              روابط قوی‌تر بسازید.<br />معاملات بیشتری ببندید.
            </h2>
            <p className="text-lg text-zinc-300 max-w-md">
              پلتفرم جامع مدیریت ارتباط با مشتری، طراحی شده برای تیم‌های فروش مدرن و پویا.
            </p>
          </div>

          {/* Decorative dashboard mockup */}
          <div className="relative w-full h-64 mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="w-32 h-4 bg-white/20 rounded-full" />
              <div className="flex gap-2">
                <div className="size-8 rounded-full bg-indigo-500/50" />
                <div className="size-8 rounded-full bg-violet-500/50" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-full h-8 bg-white/10 rounded-lg" />
              <div className="w-3/4 h-8 bg-white/10 rounded-lg" />
              <div className="w-5/6 h-8 bg-white/10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

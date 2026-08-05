"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "demo@nexacrm.app",
      password: "Demo123456!",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast.success("ورود با موفقیت انجام شد");
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "خطا در ورود به حساب");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col space-y-2 text-start">
        <h1 className="text-2xl font-bold tracking-tight">ورود به حساب کاربری</h1>
        <p className="text-sm text-muted-foreground">
          ایمیل و رمز عبور خود را وارد کنید
        </p>
      </div>

      <div className="p-4 rounded-xl border bg-blue-50/50 dark:bg-blue-900/10 text-sm shadow-sm">
        <p className="font-semibold mb-1 text-blue-700 dark:text-blue-400">حساب نمایشی</p>
        <div className="flex flex-col gap-1 text-blue-600/80 dark:text-blue-300/80">
          <span>ایمیل: demo@nexacrm.app</span>
          <span>رمز عبور: Demo123456!</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            ایمیل
          </label>
          <input
            type="email"
            dir="ltr"
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            رمز عبور
          </label>
          <input
            type="password"
            dir="ltr"
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-end"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
        >
          {isLoading && <Loader2 className="me-2 size-4 animate-spin" />}
          ورود
        </button>
      </form>

      <div className="text-center text-sm">
        <Link
          href="/signup"
          className="text-muted-foreground hover:text-primary hover:underline underline-offset-4"
        >
          حساب ندارید؟ ثبت‌نام کنید
        </Link>
      </div>
    </div>
  );
}

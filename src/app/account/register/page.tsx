"use client";

import { useState } from "react";
import { registerUser, loginWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Password validation rules
  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const isPasswordStrong = Object.values(passwordChecks).every(Boolean);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (name.trim().length < 3) {
      setError("الاسم يجب أن يكون 3 أحرف على الأقل.");
      return;
    }

    if (!isPasswordStrong) {
      setError("كلمة المرور لا تستوفي جميع الشروط المطلوبة.");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }

    setIsSubmitting(true);
    try {
      await registerUser(email.trim(), password, name.trim());

      // Save user profile to Firestore
      const { auth } = await import("@/lib/firebase");
      const { saveUserProfile } = await import("@/lib/db");
      if (auth.currentUser) {
        await saveUserProfile(auth.currentUser.uid, {
          firstName: name.trim().split(" ")[0],
          lastName: name.trim().split(" ").slice(1).join(" "),
          email: email.trim(),
        });
      }

      setSuccess(true);
    } catch (err: unknown) {
      console.error(err);
      const error = err as { code?: string };
      if (error.code === "auth/email-already-in-use") {
        setError("هذا البريد الإلكتروني مسجل مسبقاً. جرّب تسجيل الدخول.");
      } else if (error.code === "auth/weak-password") {
        setError("كلمة المرور ضعيفة جداً. استخدم 8 أحرف مع أرقام وحروف كبيرة.");
      } else if (error.code === "auth/invalid-email") {
        setError("البريد الإلكتروني غير صالح. تأكد من كتابته بشكل صحيح.");
      } else {
        setError("حدث خطأ أثناء إنشاء الحساب. تأكد من اتصالك بالإنترنت.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      // Save Google user profile
      const { saveUserProfile } = await import("@/lib/db");
      await saveUserProfile(user.uid, {
        firstName: user.displayName?.split(" ")[0] || "",
        lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
        email: user.email || "",
      });
      router.push("/account");
    } catch (err: unknown) {
      console.error(err);
      setError("فشل التسجيل باستخدام جوجل. حاول مرة أخرى.");
    }
  };

  // Success state - show verification message
  if (success) {
    return (
      <Container className="py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-md bg-surface p-10 rounded-xl border border-accent/30 shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="font-heading text-3xl text-accent mb-4">تم إنشاء الحساب بنجاح! </h1>
          <p className="text-text/80 mb-6 leading-relaxed">
            تم إرسال رسالة تأكيد إلى بريدك الإلكتروني
            <br />
            <span className="text-accent font-bold" dir="ltr">{email}</span>
            <br />
            يرجى فتح الرسالة والضغط على رابط التأكيد
          </p>
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-6 text-sm text-text/70">
            تحقق من مجلد البريد العشوائي (Spam) إذا لم تجد الرسالة
          </div>
          <button
            onClick={() => router.push("/account")}
            className="w-full h-12 bg-accent text-primary font-bold rounded-sm hover:bg-accent-light transition-colors shadow-dark"
          >
            الذهاب لحسابي
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-heading text-4xl text-accent mb-6">إنشاء حساب جديد</h1>
      <p className="text-muted mb-8 max-w-md">انضم إلينا الآن للوصول إلى طلباتك وإتمام عمليات الشراء بسهولة.</p>

      <div className="w-full max-w-sm bg-surface p-8 rounded-xl border border-border/50 shadow-2xl">
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="text-right">
            <label className="text-sm font-medium text-text mb-1 block">الاسم الكامل</label>
            <input
              type="text"
              required
              minLength={3}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: أحمد محمد"
              className="w-full bg-background border border-border rounded-sm h-12 px-4 text-right focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="text-right">
            <label className="text-sm font-medium text-text mb-1 block">البريد الإلكتروني</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              dir="ltr"
              className="w-full bg-background border border-border rounded-sm h-12 px-4 text-left focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div className="text-right">
            <label className="text-sm font-medium text-text mb-1 block">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                dir="ltr"
                className="w-full bg-background border border-border rounded-sm h-12 px-4 pl-12 text-left focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {/* Password strength indicators */}
            {password.length > 0 && (
              <div className="mt-2 space-y-1 text-xs text-right">
                <p className={passwordChecks.length ? "text-green-500" : "text-red-400"}>
                  {passwordChecks.length ? "✓" : "✗"} 8 أحرف على الأقل
                </p>
                <p className={passwordChecks.uppercase ? "text-green-500" : "text-red-400"}>
                  {passwordChecks.uppercase ? "✓" : "✗"} حرف كبير واحد (A-Z)
                </p>
                <p className={passwordChecks.lowercase ? "text-green-500" : "text-red-400"}>
                  {passwordChecks.lowercase ? "✓" : "✗"} حرف صغير واحد (a-z)
                </p>
                <p className={passwordChecks.number ? "text-green-500" : "text-red-400"}>
                  {passwordChecks.number ? "✓" : "✗"} رقم واحد على الأقل (0-9)
                </p>
              </div>
            )}
          </div>
          <div className="text-right">
            <label className="text-sm font-medium text-text mb-1 block">تأكيد كلمة المرور</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              dir="ltr"
              className={`w-full bg-background border rounded-sm h-12 px-4 text-left focus:outline-none focus:ring-2 focus:ring-accent ${confirmPassword && confirmPassword !== password ? "border-red-500" : "border-border"
                }`}
            />
            {confirmPassword && confirmPassword !== password && (
              <p className="text-red-400 text-xs mt-1">كلمتا المرور غير متطابقتين</p>
            )}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-md text-right">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !isPasswordStrong || password !== confirmPassword}
            className="w-full h-12 bg-accent text-primary font-bold rounded-sm mt-4 hover:bg-accent-light transition-colors shadow-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "جاري الإنشاء..." : "إنشاء الحساب"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs font-bold">
            <span className="bg-surface px-2 text-muted">أو</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 h-12 bg-background border border-border/50 text-text font-bold rounded-sm hover:bg-border/20 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          المتابعة باستخدام جوجل
        </button>

        <div className="mt-6 pt-6 border-t border-border/50 text-sm text-center">
          <span className="text-muted">لديك حساب بالفعل؟ </span>
          <Link href="/account" className="text-accent hover:underline font-medium focus:outline-none">
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </Container>
  );
}

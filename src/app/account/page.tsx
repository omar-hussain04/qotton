import { Container } from "@/components/ui/Container";

export default function AccountPage() {
  return (
    <Container className="py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="font-heading text-4xl text-accent mb-6">تسجيل الدخول / إنشاء حساب</h1>
      <p className="text-muted mb-8 max-w-md">يرجى تسجيل الدخول لمتابعة طلباتك، وإدارة مفضلتك، والوصول السريع لبياناتك.</p>
      
      <div className="w-full max-w-sm bg-surface p-8 rounded-xl border border-border/50 shadow-2xl">
        <form className="space-y-4">
          <div className="text-right">
            <label className="text-sm font-medium text-text mb-1 block">البريد الإلكتروني</label>
            <input type="email" placeholder="example@domain.com" dir="ltr" className="w-full bg-background border border-border rounded-sm h-12 px-4 text-left focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          <div className="text-right">
            <label className="text-sm font-medium text-text mb-1 block">كلمة المرور</label>
            <input type="password" dir="ltr" className="w-full bg-background border border-border rounded-sm h-12 px-4 text-left focus:outline-none focus:ring-2 focus:ring-accent" />
          </div>
          
          <button type="button" className="w-full h-12 bg-accent text-primary font-bold rounded-sm mt-4 hover:bg-accent-light transition-colors shadow-dark">
            تسجيل الدخول
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-border/50 text-sm text-center">
          <span className="text-muted">ليس لديك حساب؟ </span>
          <button className="text-accent hover:underline font-medium focus:outline-none">إنشاء حساب جديد</button>
        </div>
      </div>
    </Container>
  );
}

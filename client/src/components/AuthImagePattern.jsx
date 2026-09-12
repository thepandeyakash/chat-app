import { MessageCircleMore, ShieldCheck, Sparkles } from "lucide-react";

const AuthImagePattern = ({ title, subtitle }) => (
  <aside className="relative hidden min-h-screen overflow-hidden bg-primary text-primary-content lg:flex lg:items-center lg:justify-center">
    <div className="absolute -left-24 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute -bottom-32 -right-20 size-96 rounded-full bg-secondary/30 blur-3xl" />
    <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:24px_24px]" />
    <div className="relative z-10 max-w-md px-12">
      <div className="mb-10 flex items-center gap-3"><div className="flex size-12 items-center justify-center rounded-2xl bg-white/15 shadow-lg backdrop-blur"><MessageCircleMore className="size-6" /></div><span className="text-xl font-bold tracking-tight">Chatty</span></div>
      <div className="rounded-3xl border border-white/20 bg-base-100/10 p-5 shadow-2xl backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-3"><div className="size-10 rounded-full bg-accent/70" /><div className="space-y-1.5"><div className="h-2.5 w-20 rounded-full bg-white/75" /><div className="h-2 w-12 rounded-full bg-white/35" /></div></div>
        <div className="ml-12 rounded-2xl rounded-tl-sm bg-white/15 p-3 text-sm leading-relaxed text-white/85">Your conversations, all in one place.</div>
        <div className="ml-auto mt-3 w-fit rounded-2xl rounded-tr-sm bg-white px-3 py-2 text-sm font-medium text-primary shadow-sm">Always within reach</div>
      </div>
      <div className="mt-10"><div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-white/15"><Sparkles className="size-5" /></div><h2 className="text-3xl font-bold leading-tight">{title}</h2><p className="mt-3 text-base leading-7 text-primary-content/75">{subtitle}</p></div>
      <div className="mt-9 flex items-center gap-2 text-sm text-primary-content/70"><ShieldCheck className="size-4" /><span>Private, simple, and made for connection.</span></div>
    </div>
  </aside>
);

export default AuthImagePattern;

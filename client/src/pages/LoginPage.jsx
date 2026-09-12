import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();
  const handleSubmit = (e) => { e.preventDefault(); login(formData); };
  return (
    <main className="min-h-screen bg-base-200/50 pt-16 lg:grid lg:grid-cols-2 lg:pt-0">
      <section className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12"><div className="w-full max-w-md">
        <div className="mb-8 lg:hidden"><Link to="/" className="inline-flex items-center gap-2 text-lg font-bold"><span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-content"><MessageSquare className="size-5" /></span>Chatty</Link></div>
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-xl shadow-base-300/30 sm:p-8">
          <div className="mb-8"><p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Welcome back</p><h1 className="text-3xl font-bold tracking-tight">Sign in to Chatty</h1><p className="mt-2 text-base-content/60">Pick up right where your conversations left off.</p></div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="form-control w-full"><span className="label pb-1"><span className="label-text font-semibold">Email address</span></span><div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-base-content/40" /><input type="email" required autoComplete="email" className="input input-bordered h-12 w-full pl-11 focus:outline-primary" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div></label>
            <label className="form-control w-full"><span className="label pb-1"><span className="label-text font-semibold">Password</span></span><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-base-content/40" /><input type={showPassword ? "text" : "password"} required autoComplete="current-password" className="input input-bordered h-12 w-full pl-11 pr-12 focus:outline-primary" placeholder="Enter your password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2 btn-square text-base-content/55" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button></div></label>
            <button type="submit" className="btn btn-primary h-12 w-full text-base shadow-lg shadow-primary/20" disabled={isLoggingIn}>{isLoggingIn ? <><Loader2 className="size-5 animate-spin" /> Signing in...</> : "Sign in"}</button>
          </form>
          <p className="mt-7 text-center text-sm text-base-content/65">New to Chatty? <Link to="/signup" className="font-semibold text-primary hover:underline">Create a free account</Link></p>
        </div>
      </div></section>
      <AuthImagePattern title="Conversations that feel close." subtitle="Sign in to catch up with the people and messages that matter to you." />
    </main>
  );
};
export default LoginPage;

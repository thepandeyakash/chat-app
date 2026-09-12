import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail, MessageSquare, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();
  const updateField = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });
  const validateForm = () => { if (!formData.fullName.trim()) return toast.error("Full name is required"); if (!formData.email.trim()) return toast.error("Email is required"); if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format"); if (!formData.password) return toast.error("Password is required"); if (formData.password.length < 6) return toast.error("Password must be at least 6 characters"); return true; };
  const handleSubmit = (e) => { e.preventDefault(); if (validateForm()) signup(formData); };
  return (
    <main className="min-h-screen bg-base-200/50 pt-16 lg:grid lg:grid-cols-2 lg:pt-0">
      <section className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12"><div className="w-full max-w-md">
        <div className="mb-8 lg:hidden"><Link to="/" className="inline-flex items-center gap-2 text-lg font-bold"><span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-content"><MessageSquare className="size-5" /></span>Chatty</Link></div>
        <div className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-xl shadow-base-300/30 sm:p-8">
          <div className="mb-7"><p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Get started</p><h1 className="text-3xl font-bold tracking-tight">Create your account</h1><p className="mt-2 text-base-content/60">Join Chatty and start sharing the moments that matter.</p></div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-control w-full"><span className="label pb-1"><span className="label-text font-semibold">Full name</span></span><div className="relative"><UserRound className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-base-content/40" /><input type="text" required autoComplete="name" className="input input-bordered h-12 w-full pl-11 focus:outline-primary" placeholder="Your name" value={formData.fullName} onChange={updateField("fullName")} /></div></label>
            <label className="form-control w-full"><span className="label pb-1"><span className="label-text font-semibold">Email address</span></span><div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-base-content/40" /><input type="email" required autoComplete="email" className="input input-bordered h-12 w-full pl-11 focus:outline-primary" placeholder="you@example.com" value={formData.email} onChange={updateField("email")} /></div></label>
            <label className="form-control w-full"><span className="label pb-1"><span className="label-text font-semibold">Password</span><span className="label-text-alt text-base-content/50">At least 6 characters</span></span><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-base-content/40" /><input type={showPassword ? "text" : "password"} required minLength="6" autoComplete="new-password" className="input input-bordered h-12 w-full pl-11 pr-12 focus:outline-primary" placeholder="Create a password" value={formData.password} onChange={updateField("password")} /><button type="button" aria-label={showPassword ? "Hide password" : "Show password"} className="btn btn-ghost btn-sm absolute right-1 top-1/2 -translate-y-1/2 btn-square text-base-content/55" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</button></div></label>
            <button type="submit" className="btn btn-primary mt-2 h-12 w-full text-base shadow-lg shadow-primary/20" disabled={isSigningUp}>{isSigningUp ? <><Loader2 className="size-5 animate-spin" /> Creating account...</> : "Create account"}</button>
          </form>
          <p className="mt-7 text-center text-sm text-base-content/65">Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Sign in</Link></p>
        </div>
      </div></section>
      <AuthImagePattern title="Your people are waiting." subtitle="Create a free account to share, chat, and stay close—wherever life takes you." />
    </main>
  );
};
export default SignUpPage;

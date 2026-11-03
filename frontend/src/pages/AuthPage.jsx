import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, Eye, EyeOff, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPage({ mode }) {
  const isRegister = mode === "register";
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (user) return <Navigate to="/dashboard" replace />;
  function update(event) { setValues((current) => ({ ...current, [event.target.name]: event.target.value })); }

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (isRegister) await signUp(values);
      else await signIn({ email: values.email, password: values.password });
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (reason) { setError(reason.message); }
    finally { setBusy(false); }
  }

  return <section className="auth-page"><div className="auth-art"><Link className="brand auth-brand" to="/"><span className="brand-icon"><BookOpen size={19} /></span>learnhub<span className="brand-dot">.</span></Link><div className="auth-art-copy"><span className="auth-spark"><Sparkles size={18} /></span><h2>It starts<br />with <span className="serif-word">you.</span></h2><p>Curiosity got you here. Let’s see where it takes you.</p></div><div className="auth-art-bottom"><span>LEARN A LITTLE. GROW A LOT.</span><span>✳</span></div></div><div className="auth-form-side"><Link className="auth-back" to="/"><ArrowLeft size={15} /> Back home</Link><div className="auth-form-wrap"><span className="eyebrow"><span className="eyebrow-dot" /> {isRegister ? "A good thing starts here" : "Welcome back"}</span><h1>{isRegister ? <>Make yourself<br />at <span className="serif-word">home.</span></> : <>Good to<br />see <span className="serif-word">you.</span></>}</h1><p className="auth-intro">{isRegister ? "Create your account and find your next favorite thing." : "Pick up right where your curiosity left off."}</p><form className="auth-form" onSubmit={submit}>{isRegister && <label>Your name<input name="name" autoComplete="name" value={values.name} onChange={update} placeholder="What should we call you?" minLength="2" maxLength="100" required /></label>}<label>Email address<input name="email" type="email" autoComplete="email" value={values.email} onChange={update} placeholder="you@example.com" required /></label><label>Password<span className="password-wrap"><input name="password" type={showPassword ? "text" : "password"} autoComplete={isRegister ? "new-password" : "current-password"} value={values.password} onChange={update} placeholder={isRegister ? "At least 8 characters" : "Your password"} minLength={isRegister ? "8" : undefined} required /><button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>{error && <p className="auth-error">{error}</p>}<button className="button button-dark auth-submit" disabled={busy}>{busy ? "One moment..." : isRegister ? "Create my account" : "Sign in"} <ArrowUpRight size={16} /></button></form><p className="auth-switch">{isRegister ? "Already learning with us?" : "New to LearnHub?"} <Link to={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Make an account"} <ArrowRight size={14} /></Link></p><p className="auth-trust"><Check size={14} /> Your learning, your pace. Always.</p></div></div></section>;
}

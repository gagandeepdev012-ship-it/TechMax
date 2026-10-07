import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { errMsg } from '../services/api';
import { useAuth } from '../context/AuthContext';
function Shell({ title, fields, mode }) {
  const [v, setV] = useState({}), [errs, setErrs] = useState({}), [busy, setBusy] = useState(false), { login, notify } = useAuth(), nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault(); const er = {};
    fields.forEach(([k, l]) => { if (!v[k]?.trim()) er[k] = `${l} is required`; });
    if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) er.email = 'Enter a valid email';
    if (mode === 'register' && v.password && v.password.length < 6) er.password = 'Use at least 6 characters';
    if (mode === 'register' && v.password !== v.confirm) er.confirm = 'Passwords do not match';
    setErrs(er); if (Object.keys(er).length) return;
    setBusy(true);
    try { const { data } = await api.post('/auth/' + mode, v); login(data); notify(mode === 'login' ? 'Welcome back' : 'Account created'); nav(data.user.role === 'admin' ? '/admin' : '/my-queries'); }
    catch (x) { notify(errMsg(x), true); } finally { setBusy(false); }
  };
  return <form className="form card" onSubmit={submit} noValidate><h2>{title}</h2>
    {fields.map(([k, l, t]) => <div key={k}><label>{l}</label><input type={t} value={v[k] || ''} onChange={(e) => setV({ ...v, [k]: e.target.value })} />{errs[k] && <span className="err">{errs[k]}</span>}</div>)}
    {mode === 'login' && <div className="row2" style={{ marginTop: 12 }}><label style={{ margin: 0 }}><input type="checkbox" style={{ width: 'auto' }} /> Remember me</label><a href="#" className="mute">Forgot password?</a></div>}
    <br /><button className="btn" disabled={busy} style={{ width: '100%' }}>{busy ? 'Please wait…' : title}</button>
    <p className="mute">{mode === 'login' ? <>New here? <Link to="/register">Create an account</Link></> : <>Have an account? <Link to="/login">Log in</Link></>}</p></form>;
}
export const Login = () => <Shell title="Log in" mode="login" fields={[['email', 'Email', 'email'], ['password', 'Password', 'password']]} />;
export const Register = () => <Shell title="Create account" mode="register" fields={[['name', 'Full name', 'text'], ['email', 'Email', 'email'], ['password', 'Password', 'password'], ['confirm', 'Confirm password', 'password']]} />;

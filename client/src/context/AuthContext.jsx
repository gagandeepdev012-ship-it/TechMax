import { createContext, useContext, useState, useCallback } from 'react';
const Ctx = createContext();
export const useAuth = () => useContext(Ctx);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('tm_user') || 'null'));
  const [toast, setToast] = useState(null);
  const [dark, setDark] = useState(localStorage.getItem('tm_theme') === 'dark');
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  const login = (d) => { localStorage.setItem('tm_token', d.token); localStorage.setItem('tm_user', JSON.stringify(d.user)); setUser(d.user); };
  const logout = () => { localStorage.removeItem('tm_token'); localStorage.removeItem('tm_user'); setUser(null); };
  const notify = useCallback((msg, err) => { setToast({ msg, err }); setTimeout(() => setToast(null), 3500); }, []);
  const toggle = () => { localStorage.setItem('tm_theme', dark ? 'light' : 'dark'); setDark(!dark); };
  return <Ctx.Provider value={{ user, login, logout, notify, dark, toggle }}>{children}{toast && <div className={'toast' + (toast.err ? ' err' : '')}>{toast.msg}</div>}</Ctx.Provider>;
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api, { errMsg } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { CATS } from '../components/QueryFilters';
export default function Ask() {
  const { user, notify } = useAuth(), nav = useNavigate(), [busy, setBusy] = useState(false), [errs, setErrs] = useState({});
  const [v, setV] = useState({ title: '', category: '', description: '', priority: 'Medium' });
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const submit = async (e) => {
    e.preventDefault(); const er = {};
    if (v.title.trim().length < 5) er.title = 'Title needs at least 5 characters';
    if (!v.category) er.category = 'Choose a category';
    if (v.description.trim().length < 20) er.description = 'Describe your question in at least 20 characters';
    setErrs(er); if (Object.keys(er).length) return;
    setBusy(true);
    try { const { data } = await api.post('/queries', v); notify(`Your query has been submitted successfully. ID: ${data.queryId}`); nav('/my-queries'); }
    catch (x) { notify(errMsg(x), true); } finally { setBusy(false); }
  };
  const E = (k) => errs[k] && <span className="err">{errs[k]}</span>;
  return <form className="form card" onSubmit={submit} noValidate><h2>Ask a query</h2>
    <label>Name</label><input value={user.name} readOnly /><label>Email</label><input value={user.email} readOnly />
    <label>Query title</label><input value={v.title} onChange={set('title')} />{E('title')}
    <label>Category</label><select value={v.category} onChange={set('category')}><option value="">Select category</option>{CATS.map((c) => <option key={c}>{c}</option>)}</select>{E('category')}
    <label>Description</label><textarea rows="6" value={v.description} onChange={set('description')} />{E('description')}
    <label>Priority</label><select value={v.priority} onChange={set('priority')}>{['Low', 'Medium', 'High'].map((p) => <option key={p}>{p}</option>)}</select>
    <br /><button className="btn" disabled={busy}>{busy ? 'Submitting…' : 'Submit Query'}</button></form>;
}

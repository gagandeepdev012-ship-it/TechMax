import { useState } from 'react';
import api, { errMsg } from '../services/api';
import useFetch from '../hooks/useFetch';
import QueryFilters from '../components/QueryFilters';
import { Badge, Skeletons, Empty, Fail, Confirm, fmt } from '../components/Bits';
import { useAuth } from '../context/AuthContext';
export default function Admin() {
  const [f, setF] = useState({ page: 1 }), [open, setOpen] = useState(null), [reply, setReply] = useState(''), [del, setDel] = useState(null), { notify } = useAuth();
  const { data, loading, error, reload } = useFetch('/admin/queries', f, [JSON.stringify(f)]);
  const run = async (fn, ok) => { try { await fn(); notify(ok); setOpen(null); reload(); } catch (e) { notify(errMsg(e), true); } };
  const s = data?.stats || {}, total = (s.Pending || 0) + (s['In Progress'] || 0) + (s.Resolved || 0);
  return <div className="wrap sec"><h2>Admin dashboard</h2>
    <div className="stats">{[['Total Queries', total], ['Pending', s.Pending], ['In Progress', s['In Progress']], ['Resolved', s.Resolved]].map(([l, n]) => <div className="card" key={l}><b>{n ?? '–'}</b><p>{l}</p></div>)}</div>
    <QueryFilters f={f} set={setF} full />
    {loading ? <Skeletons /> : error ? <Fail msg={error} retry={reload} /> : !data.items.length ? <Empty>No queries match these filters.</Empty> :
      <div className="card" style={{ overflowX: 'auto' }}><table><thead><tr><th>ID</th><th>Title</th><th>User</th><th>Category</th><th>Priority</th><th>Status</th><th>Date</th><th /></tr></thead><tbody>
        {data.items.map((q) => <tr key={q._id}><td>{q.queryId}</td><td>{q.title}</td><td>{q.user?.name}</td><td>{q.category}</td><td><Badge v={q.priority} /></td><td><Badge v={q.status} /></td><td>{fmt(q.createdAt)}</td>
          <td><button className="btn sm ghost" onClick={() => { setOpen(q); setReply(q.response); }}>Open</button></td></tr>)}</tbody></table></div>}
    <div className="bar"><button className="btn ghost sm" disabled={f.page < 2} onClick={() => setF({ ...f, page: f.page - 1 })}>Previous</button><span className="mute">Page {f.page} of {data?.pages || 1}</span><button className="btn ghost sm" disabled={!data || f.page >= data.pages} onClick={() => setF({ ...f, page: f.page + 1 })}>Next</button></div>
    {open && <div className="modal" onClick={() => setOpen(null)}><div className="card" style={{ width: 'min(600px,92vw)' }} onClick={(e) => e.stopPropagation()}>
      <h3>{open.title}</h3><p className="mute">{open.user?.name} · {open.user?.email}</p><div className="msg u" style={{ maxWidth: '100%' }}>{open.description}</div>
      <label>Status</label><select value={open.status} onChange={(e) => run(async () => { await api.put('/queries/' + open._id, { status: e.target.value }); }, 'Status updated')}>{['Pending', 'In Progress', 'Resolved'].map((x) => <option key={x}>{x}</option>)}</select>
      <label>Reply</label><textarea rows="4" value={reply} onChange={(e) => setReply(e.target.value)} /><br />
      <button className="btn sm" onClick={() => run(() => api.post(`/queries/${open._id}/reply`, { response: reply }), 'Reply sent')}>Send reply</button> <button className="btn red sm" onClick={() => setDel(open)}>Delete</button></div></div>}
    {del && <Confirm text={`Delete ${del.queryId}? This cannot be undone.`} onNo={() => setDel(null)} onYes={() => { run(() => api.delete('/queries/' + del._id), 'Query deleted'); setDel(null); }} />}</div>;
}

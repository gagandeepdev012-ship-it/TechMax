import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import QueryFilters from '../components/QueryFilters';
import { Badge, Skeletons, Empty, Fail, fmt, copy } from '../components/Bits';
import { useAuth } from '../context/AuthContext';
export default function MyQueries() {
  const [f, setF] = useState({ page: 1 }), { notify } = useAuth();
  const { data, loading, error, reload } = useFetch('/queries', f, [JSON.stringify(f)]);
  return <div className="wrap sec"><div className="row2"><h2>My queries</h2><Link className="btn" to="/ask">Ask a query</Link></div>
    <QueryFilters f={f} set={setF} />
    {loading ? <Skeletons /> : error ? <Fail msg={error} retry={reload} /> : !data.items.length ? <Empty>No queries found. <Link to="/ask">Ask your first one.</Link></Empty> :
      <><div className="grid">{data.items.map((q) => <div className="card" key={q._id}>
        <div className="row2"><Badge v={q.status} /><Badge v={q.priority} /></div><h3 style={{ marginTop: 12 }}>{q.title}</h3>
        <p className="mute">{q.category} · {fmt(q.createdAt)}</p>
        <p className="mute">{q.queryId} <a href="#" onClick={(e) => { e.preventDefault(); copy(q.queryId); notify('Query ID copied'); }}>Copy</a></p><br />
        <Link className="btn ghost sm" to={'/queries/' + q._id}>View details</Link></div>)}</div>
        <div className="bar"><button className="btn ghost sm" disabled={f.page < 2} onClick={() => setF({ ...f, page: f.page - 1 })}>Previous</button><span className="mute">Page {f.page} of {data.pages}</span><button className="btn ghost sm" disabled={f.page >= data.pages} onClick={() => setF({ ...f, page: f.page + 1 })}>Next</button></div></>}</div>;
}

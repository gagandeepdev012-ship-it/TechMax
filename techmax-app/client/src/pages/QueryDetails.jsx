import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Badge, Skeletons, Fail, fmt } from '../components/Bits';
export default function QueryDetails() {
  const { id } = useParams(), { data: q, loading, error, reload } = useFetch('/queries/' + id, null, [id]);
  if (loading) return <div className="wrap sec"><Skeletons /></div>;
  if (error) return <div className="wrap sec"><Fail msg={error} retry={reload} /></div>;
  return <div className="wrap sec" style={{ maxWidth: 760 }}><Link to="/my-queries" className="mute">← Back to my queries</Link>
    <h2>{q.title}</h2><div className="bar"><Badge v={q.status} /><Badge v={q.priority} /><span className="mute">{q.queryId} · {q.category} · {fmt(q.createdAt)}</span></div>
    <div className="msg u"><b>You</b><p>{q.description}</p></div>
    {q.response ? <div className="msg t"><b>TechMax</b><p>{q.response}</p></div> : <div className="empty card">No response yet. We'll reply here as soon as the team reviews it.</div>}</div>;
}

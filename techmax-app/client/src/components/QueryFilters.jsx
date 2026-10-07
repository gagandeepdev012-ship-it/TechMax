export const CATS = ['Web Development', 'Cyber Security', 'Machine Learning', 'Data Science', 'Computer Operator'];
export default function QueryFilters({ f, set, full }) {
  const S = (k, opts, label) => <select value={f[k] || ''} onChange={(e) => set({ ...f, [k]: e.target.value, page: 1 })}><option value="">{label}</option>{opts.map((o) => <option key={o}>{o}</option>)}</select>;
  return <div className="bar"><input placeholder="Search by title or Query ID" value={f.search || ''} onChange={(e) => set({ ...f, search: e.target.value, page: 1 })} />
    {S('status', ['Pending', 'In Progress', 'Resolved'], 'All statuses')}{full && S('category', CATS, 'All categories')}{full && S('priority', ['Low', 'Medium', 'High'], 'All priorities')}</div>;
}

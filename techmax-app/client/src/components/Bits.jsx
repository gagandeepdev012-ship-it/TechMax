export const Badge = ({ v }) => <span className={'badge ' + v}>{v}</span>;
export const Skeletons = () => <div className="grid">{[1, 2, 3].map((i) => <div key={i} className="skel" />)}</div>;
export const Empty = ({ children }) => <div className="empty card">{children}</div>;
export const Fail = ({ msg, retry }) => <div className="empty card"><p className="err">{msg}</p><button className="btn ghost sm" onClick={retry}>Try again</button></div>;
export const Confirm = ({ text, onYes, onNo }) => <div className="modal"><div className="card"><h3>Are you sure?</h3><p>{text}</p><br /><button className="btn red sm" onClick={onYes}>Delete</button> <button className="btn ghost sm" onClick={onNo}>Cancel</button></div></div>;
export const fmt = (d) => new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
export const copy = (t) => navigator.clipboard?.writeText(t);

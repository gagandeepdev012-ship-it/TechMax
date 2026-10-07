import { Link } from 'react-router-dom';
const A = [['Expert Support', 'Answers from engineers who work in the field.'], ['Fast Responses', 'High-priority queries are picked up first.'], ['Developer Friendly', 'Ask in code, logs or plain language.'], ['Learning Focused', 'Replies explain the why, not just the fix.']];
export default function Home() {
  return <><section className="hero"><div className="wrap"><div>
    <h1>Have a Question? Let's Find the Answer.</h1>
    <p>Worried about your future in IT? Get expert guidance from the TechMax team.</p>
    <div className="row"><Link className="btn" to="/ask">Ask a Query</Link><a className="btn ghost" style={{ color: '#fff', borderColor: '#35487a' }} href="#about">Explore TechMax</a></div></div>
    <div className="term"><i>$</i> techmax ask "Which path: ML or web?"<br /><em>✓ Query TMQ-8F2K1A created</em><br /><i>$</i> techmax status<br />Status: <em>Resolved</em> · reply from TechMax team</div></div></section>
    <section className="sec wrap" id="about"><h2>About TechMax</h2>
      <p className="mute" style={{ maxWidth: 620 }}>TechMax is a technology-focused platform designed to help students, developers, and users get answers to their technical questions.</p>
      <div className="grid" style={{ marginTop: 24 }}>{A.map(([t, d]) => <div className="card" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div></section></>;
}

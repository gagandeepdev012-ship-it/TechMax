import { useEffect, useState } from 'react';
import api, { errMsg } from '../services/api';
export default function useFetch(url, params, deps = []) {
  const [data, setData] = useState(null), [loading, setLoading] = useState(true), [error, setError] = useState('');
  const load = () => { setLoading(true); api.get(url, { params }).then((r) => { setData(r.data); setError(''); }).catch((e) => setError(errMsg(e))).finally(() => setLoading(false)); };
  useEffect(load, deps);
  return { data, loading, error, reload: load };
}

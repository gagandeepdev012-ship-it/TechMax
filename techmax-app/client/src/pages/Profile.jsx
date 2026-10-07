import { useAuth } from '../context/AuthContext';
export default function Profile() {
  const { user } = useAuth();
  return <div className="form card"><h2>Profile</h2><label>Name</label><input value={user.name} readOnly /><label>Email</label><input value={user.email} readOnly /><label>Role</label><input value={user.role} readOnly /></div>;
}

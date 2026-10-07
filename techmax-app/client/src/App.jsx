import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Guard from './components/Guard';
import Home from './pages/Home';
import Ask from './pages/Ask';
import MyQueries from './pages/MyQueries';
import QueryDetails from './pages/QueryDetails';
import { Login, Register } from './pages/Auth';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
export default () => <Routes><Route element={<MainLayout />}>
  <Route path="/" element={<Home />} /><Route path="/login" element={<Login />} /><Route path="/register" element={<Register />} />
  <Route path="/ask" element={<Guard><Ask /></Guard>} /><Route path="/my-queries" element={<Guard><MyQueries /></Guard>} />
  <Route path="/queries/:id" element={<Guard><QueryDetails /></Guard>} /><Route path="/profile" element={<Guard><Profile /></Guard>} /><Route path="/admin" element={<Guard admin><Admin /></Guard>} />
</Route></Routes>;

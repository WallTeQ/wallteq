import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/shared/Dashboard';
import Users from '../pages/users/index';
import CategoryPage from '../pages/categories/index';
import Templates from '../pages/templates/index';
import Tickets from '../pages/tickets/index';
import Carts from '../pages/cart/index';
import Contact from '../pages/contact/index';

const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/users" element={<Users />} />
    <Route path="/categories" element={<CategoryPage />} />
    <Route path="/Templates" element={<Templates />} />
    <Route path="/tickets" element={<Tickets />} />
    <Route path="/carts" element={<Carts />} />
    <Route path="/contacts" element={<Contact />} />
  </Routes>
);

export default AdminRoutes;
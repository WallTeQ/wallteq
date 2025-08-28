import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/shared/Dashboard';
import Users from '../pages/users/index';
import CategoryPage from '../pages/categories/index';
import Templates from '../pages/templates/index';
import Tickets from '../pages/tickets/index';
import Carts from '../pages/cart/index';
import Contact from '../pages/contact/index';
import NotFound from '../pages/NotFound';
import UsersPage from '../dashboard/pages/users';
import TemplatesPage from '../dashboard/pages/templates';
import OrdersPage from '../dashboard/pages/orders';
import TicketsPage from '../dashboard/pages/tickets';
import AddTemplatePage from '../dashboard/pages/add-template';
import TicketTemplatesPage from '../dashboard/pages/tickets-template';
import AnalyticsPage from '../dashboard/pages/analytics';
const AdminRoutes = () => (
  console.log("AdminRoutes - rendering"),
  <Routes>
    <Route path="/" element={<AnalyticsPage />} />
    <Route path="/users" element={<UsersPage />} />
    <Route path="/categories" element={<CategoryPage />} />
    <Route path="/templates" element={<TemplatesPage />} />
    <Route path="/templates/add" element={<AddTemplatePage />} />
    <Route path="/tickets" element={<TicketsPage />} />
    <Route path="/tickets/:ticketId/templates" element={<TicketTemplatesPage />} />
    <Route path="/carts" element={<Carts />} />
    <Route path="/orders" element={<OrdersPage />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AdminRoutes;
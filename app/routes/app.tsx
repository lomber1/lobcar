import { Outlet } from 'remix';
import Navbar from '~/components/Navbar';

export default function Index() {
  return (
    <div>
      <Navbar />

      <Outlet />
    </div>
  );
}

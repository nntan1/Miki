import { Outlet } from 'react-router-dom';
import { Header, Footer } from './default';

export default function MainLayout() {
  return (
    <div className="overflow-hidden">
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
}

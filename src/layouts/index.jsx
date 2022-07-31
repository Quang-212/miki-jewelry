import Footer from './components/Footer';
import Header from './components/Header';

export default function MainLayout({ children, variant }) {
  if (variant === 'footer') {
    return (
      <div className="relative wrapper">
        <main>{children}</main>
        <Footer />
      </div>
    );
  }

  if (variant === 'admin') {
    return (
      <div className="relative wrapper">
        <Header />
        {/* <Sidebar /> */}
        <h1>Admin Layout</h1>
        <main>{children}</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

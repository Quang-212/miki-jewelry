import Footer from './components/Footer';
import Header from './components/Header';

export default function MainLayout({ children, variant }) {
  if (variant === 'footer') {
    return (
      <div className="wrapper">
        <main>{children}</main>
        <Footer />
      </div>
    );
  }

  if (variant === 'admin') {
    return (
      <>
        <Header />
        {/* <Sidebar /> */}
        <h1>Admin Layout</h1>
        <main>{children}</main>
        <Footer />
      </>
    );
  }

  return (
    <div className="wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

import { Header, Footer } from './default';

export default function MainLayout({ children, variant }) {
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
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

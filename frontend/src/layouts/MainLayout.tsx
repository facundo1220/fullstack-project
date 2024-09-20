import Footer from "../components/MainLayout/Footer";
import Header from "../components/MainLayout/Header";

interface props {
  children: JSX.Element | JSX.Element[];
}

function MainLayout({ children }: props) {
  return (
    <div className="h-screen bg-[#e2e2e2] flex flex-col justify-between">
      <header className="h-20">
        <Header />
      </header>

      <main className="flex-grow p-3">{children}</main>

      <footer className="h-20">
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;

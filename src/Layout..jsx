import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen px-2 sm:px-4 md:px-12 lg:px-28 xl:px-40 background">
      <Header />
      <main className="mt-2 sm:mt-3 lg:mt-4 mb-2 sm:mb-3 lg:mb-4 flex-grow">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

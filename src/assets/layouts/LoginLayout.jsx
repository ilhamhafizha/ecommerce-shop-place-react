import Header from "../components/Header";
import Login from "../components/FormLogin";
import Footer from "../components/Footer";

const LoginLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill">
        <Login />
      </main>
      <Footer />
    </div>
  );
};

export default LoginLayout;

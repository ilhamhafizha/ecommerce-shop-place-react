import Header from "../components/Header";
import Register from "../components/FormRegister";
import Footer from "../components/Footer";

const RegisterLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill">
        <Register />
      </main>
      <Footer />
    </div>
  );
};

export default RegisterLayout;

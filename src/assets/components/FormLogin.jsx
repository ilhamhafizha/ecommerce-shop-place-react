import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="container mt-5">
      <h2>Masuk ke Akun Anda</h2>
      <form>
        <input type="email" className="form-control mb-3" placeholder="Email" />
        <input type="password" className="form-control mb-3" placeholder="Password" />
        <button className="btn btn-danger w-100">Masuk</button>
      </form>
      <p className="mt-3">
        Belum punya akun? <Link to="/register">Daftar</Link>
      </p>
    </div>
  );
};

export default Login;

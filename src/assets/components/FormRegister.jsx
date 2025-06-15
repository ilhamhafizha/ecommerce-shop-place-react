import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="container mt-5">
      <h2>Buat Akun Baru</h2>
      <form>
        <input type="text" className="form-control mb-3" placeholder="Nama Lengkap" />
        <input type="email" className="form-control mb-3" placeholder="Email" />
        <input type="password" className="form-control mb-3" placeholder="Password" />
        <button className="btn btn-success w-100">Daftar</button>
      </form>
      <p className="mt-3">Sudah punya akun? <Link to="/login">Masuk</Link></p>
    </div>
  );
};

export default Register;

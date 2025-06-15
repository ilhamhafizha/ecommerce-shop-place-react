import React, { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeContext } from "../../context/ThemeContext";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useContext(ThemeContext);
  const product = location.state?.product;

  const handlePayment = () => {
    Swal.fire({
      title: "Konfirmasi Pembayaran",
      text: "Apakah kamu yakin ingin membayar sekarang?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Bayar Sekarang",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#aaa",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Pembayaran Berhasil!",
          text: "Terima kasih telah berbelanja",
          confirmButtonColor: "#d33",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <div className={`d-flex flex-column min-vh-100 ${isDark ? "bg-dark text-white" : ""}`}>
      <Header />
      <main className="flex-fill container py-5">
        <h2 className="mb-4">Checkout</h2>
        <div className={`card p-4 ${isDark ? "bg-secondary text-white border-light" : ""}`}>
          {product ? (
            <>
              <h5>Ringkasan Pesanan</h5>
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div>
                  <p className="mb-1 fw-bold">{product.title}</p>
                  <p className="mb-1">Jumlah: {product.quantity}</p>
                  <p className="mb-0">Harga: ${product.price}</p>
                </div>
              </div>
              <button className="btn btn-danger mt-3" onClick={handlePayment}>
                Bayar Sekarang
              </button>
            </>
          ) : (
            <p>Data produk tidak tersedia. Silakan pilih produk terlebih dahulu.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;

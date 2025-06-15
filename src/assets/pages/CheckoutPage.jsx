// src/pages/CheckoutPage.jsx
import React from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill container py-5">
        <h2 className="mb-4">Checkout</h2>
        <div className="card p-4">
          {product ? (
            <div className="card p-4">
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
            </div>
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

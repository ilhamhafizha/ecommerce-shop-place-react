import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DetailPage = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-5">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-outline-danger mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className={`d-flex flex-column min-vh-100 ${isDark ? "bg-dark text-white" : ""}`}>
      <Header />
      <main className="flex-fill">
        <div className="container py-4">
          <Link to="/" className="text-danger text-decoration-none mb-3 d-inline-block">
            ← Back to Products
          </Link>

          <div className="row gy-4">
            {/* Product Images */}
            <div className="col-12 col-md-6">
              <div className="border rounded mb-3" style={{ height: "400px", overflow: "hidden" }}>
                <img
                  src={product.images[activeImage] || product.thumbnail}
                  alt={product.title}
                  className="w-100 h-100"
                  style={{ objectFit: "contain", background: "#f8f8f8" }}
                />
              </div>

              {/* Thumbnail Gallery */}
              <div className="d-flex flex-wrap gap-2">
                {product.images?.map((image, index) => (
                  <div
                    key={index}
                    className="border rounded"
                    style={{
                      width: "70px",
                      height: "70px",
                      cursor: "pointer",
                      border:
                        activeImage === index ? "2px solid rgb(244, 67, 54)" : "1px solid #ccc",
                    }}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      className="w-100 h-100 rounded"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="col-12 col-md-6">
              <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap">
                <span
                  className="badge rounded-pill"
                  style={{
                    background:
                      product.stock > 10
                        ? isDark
                          ? "#2e7d32"
                          : "#e6f7e6"
                        : product.stock > 0
                        ? isDark
                          ? "#e65100"
                          : "#fff3e0"
                        : isDark
                        ? "#555"
                        : "#f8d7da",
                    color:
                      product.stock > 10
                        ? isDark
                          ? "#fff"
                          : "#2e7d32"
                        : product.stock > 0
                        ? isDark
                          ? "#fff"
                          : "#e65100"
                        : "#fff",
                    padding: "6px 12px",
                    fontSize: "14px",
                  }}
                >
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                    ? "Low Stock"
                    : "Out of Stock"}
                </span>

                <div className="d-flex align-items-center gap-1 text-danger">
                  <span>★</span>
                  <span>{product.rating}</span>
                </div>
              </div>

              <h2 className="fw-bold mb-2">{product.title}</h2>
              <p className="text-muted mb-3">
                Brand: <strong>{product.brand}</strong>
              </p>

              <div className="d-flex align-items-baseline gap-2 mb-3">
                <h3 className="fw-bold">${product.price.toFixed(2)}</h3>
                {product.discountPercentage > 0 && (
                  <>
                    <del className="text-muted">
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </del>
                    <span className="badge bg-danger">
                      {product.discountPercentage.toFixed(0)}% OFF
                    </span>
                  </>
                )}
              </div>

              <p
                className="border-top border-bottom py-3 mb-3"
                style={{ color: isDark ? "#ccc" : "#555" }}
              >
                {product.description}
              </p>

              <p>
                <strong>Category:</strong> {product.category}
              </p>
              {product.tags && (
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="badge"
                      style={{
                        background: isDark ? "#444" : "#f1f1f1",
                        color: isDark ? "#fff" : "#333",
                        padding: "6px 12px",
                        borderRadius: "15px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="d-flex flex-column flex-md-row gap-3">
                <button className="btn btn-danger w-100 w-md-auto">Add to Cart</button>
                <button className="btn btn-outline-danger w-100 w-md-auto">♡ Wishlist</button>
                <Link
                  to="/checkout"
                  state={{
                    product: {
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      quantity: 1,
                      thumbnail: product.thumbnail,
                    },
                  }}
                  className="btn btn-danger w-100 w-md-auto"
                >
                  Beli Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DetailPage;

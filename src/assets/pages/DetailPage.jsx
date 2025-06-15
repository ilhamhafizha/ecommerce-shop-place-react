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
      <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
        <div className="loading">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Product not found</h2>
        <Link to="/" style={{ color: "rgb(244, 67, 54)", textDecoration: "none" }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className={`d-flex flex-column min-vh-100 ${isDark ? "bg-dark text-white" : ""}`}>
      <Header />
      <main className="flex-fill">
        <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
          <Link
            to="/"
            style={{
              display: "inline-block",
              marginBottom: "20px",
              color: "rgb(244, 67, 54)",
              textDecoration: "none",
            }}
          >
            ← Back to Products
          </Link>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              background: isDark ? "#333" : "#fff",
              borderRadius: "8px",
              padding: "30px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            {/* Product Images */}
            <div>
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "15px",
                }}
              >
                <img
                  src={product.images[activeImage] || product.thumbnail}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    background: "#f8f8f8",
                  }}
                />
              </div>

              {/* Thumbnail Gallery */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {product.images &&
                  product.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveImage(index)}
                      style={{
                        width: "70px",
                        height: "70px",
                        border: activeImage === index ? "2px solid rgb(244, 67, 54)" : "1px solid #ddd",
                        borderRadius: "4px",
                        cursor: "pointer",
                        padding: "2px",
                      }}
                    >
                      <img
                        src={image}
                        alt={`${product.title} - view ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <span
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
                    padding: "4px 12px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock"}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "rgb(244, 67, 54)" }}>
                  <span>★</span>
                  <span style={{ fontWeight: "500" }}>{product.rating}</span>
                </div>
              </div>

              <h1 style={{ fontSize: "28px", margin: "0 0 10px 0", color: isDark ? "#fff" : "#333" }}>
                {product.title}
              </h1>

              <div style={{ marginBottom: "20px" }}>
                <span style={{ color: "#999", fontSize: "14px" }}>Brand: </span>
                <span style={{ fontWeight: "500" }}>{product.brand}</span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ fontSize: "28px", fontWeight: "600", color: "#111" }}>${product.price.toFixed(2)}</span>

                {product.discountPercentage > 0 && (
                  <>
                    <span style={{ textDecoration: "line-through", color: "#999", fontSize: "18px" }}>
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                    </span>
                    <span
                      style={{
                        background: "#f44336",
                        color: "white",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {product.discountPercentage.toFixed(0)}% OFF
                    </span>
                  </>
                )}
              </div>

              <div
                style={{
                  padding: "15px 0",
                  borderTop: "1px solid #eee",
                  borderBottom: "1px solid #eee",
                  marginBottom: "20px",
                }}
              >
                <p style={{ fontSize: "16px", lineHeight: "1.6", color: "#555", margin: "0" }}>{product.description}</p>
              </div>

              <div style={{ marginBottom: "25px" }}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px", fontSize: "14px" }}>
                  <span style={{ color: "#666", width: "120px" }}>Category:</span>
                  <span
                    style={{
                      background: isDark ? "#333" : "#f1f1f1",
                      padding: "2px 10px",
                      borderRadius: "15px",
                      color: isDark ? "#fff" : "#333",
                    }}
                  >
                    {product.category}
                  </span>
                </div>

                {product.tags && (
                  <div style={{ display: "flex", gap: "10px", fontSize: "14px", alignItems: "center" }}>
                    <span style={{ color: "#666", width: "120px" }}>Tags:</span>
                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                      {product.tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            background: isDark ? "#333" : "#f1f1f1",
                            padding: "2px 10px",
                            borderRadius: "15px",
                            color: isDark ? "#fff" : "#333",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  style={{
                    background: "rgb(244, 67, 54)",
                    color: "white",
                    border: "none",
                    padding: "12px 25px",
                    borderRadius: "4px",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    flex: "1",
                  }}
                >
                  Add to Cart
                </button>

                <button
                  style={{
                    background: "white",
                    color: "rgb(244, 67, 54)",
                    border: "1px solid rgb(244, 67, 54)",
                    padding: "12px 25px",
                    borderRadius: "4px",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  ♡ Wishlist
                </button>
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

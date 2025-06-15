// HomeLayout.jsx
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import CarouselSection from "../components/CarouselSection";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const HomeLayout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { isDark } = useContext(ThemeContext);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((p) => p.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className={`d-flex flex-column min-vh-100 ${isDark ? "bg-dark text-white" : ""}`}>
      <Header />
      <main className="flex-fill">
        <CarouselSection />

        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">Product</h4>
            <div className="d-flex align-items-center gap-2">
              <label htmlFor="categoryFilter" className="form-label mb-0">
                Filter by Category
              </label>
              <select
                id="categoryFilter"
                className={`form-select ${isDark ? "bg-dark text-white border-secondary" : ""}`}
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All</option>
                {[...new Set(products.map((p) => p.category))].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="col">
                    <Link
                      to={`/detail/${product.id}`}
                      className={`text-decoration-none ${isDark ? "text-white" : "text-dark"}`}
                    >
                      <div className={`card h-100 shadow-sm ${isDark ? "bg-secondary border-light" : ""}`}>
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="card-img-top"
                          loading="lazy"
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{product.title}</h5>
                          <p className="card-text text-truncate">{product.description}</p>
                          <div className="mt-auto">
                            <p className="mb-1">
                              <strong>Price:</strong> ${product.price}
                            </p>
                            <p className="mb-1">
                              <strong>Category:</strong> {product.category}
                            </p>
                            <p className="mb-0">
                              <strong>Rating:</strong> {product.rating}/5
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-center mt-4">
                <nav>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage((prev) => prev - 1)}>
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                        <button
                          className={`page-link ${isDark ? "bg-danger text-white" : "btn btn-outline-primary"}`}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage((prev) => prev + 1)}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;

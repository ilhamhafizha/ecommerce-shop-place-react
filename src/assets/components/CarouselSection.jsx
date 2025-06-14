import Carousel from "react-bootstrap/Carousel";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const CarouselSection = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className={`py-4 ${isDark ? "bg-dark" : "bg-light"}`}>
      <div className="container">
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://as1.ftcdn.net/v2/jpg/03/14/28/96/1000_F_314289607_ADADbnGr64dpGnddyhZPidCoc6jgKiHK.jpg"
              alt="First slide"
              style={{
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Deskripsi singkat slide pertama.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://as2.ftcdn.net/jpg/04/30/04/89/1000_F_430048954_Iw0YZEUr2ZTwnoKzKgfJogGpKXWGuIe2.jpg"
              alt="Second slide"
              style={{
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            {/* <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Deskripsi singkat slide kedua.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://as2.ftcdn.net/v2/jpg/03/48/05/47/1000_F_348054737_Tv5fl9LQnZnzDUwskKVKd5Mzj4SjGFxa.jpg"
              alt="Third slide"
              style={{
                height: "300px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            {/* <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Deskripsi singkat slide ketiga.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default CarouselSection;

import { Link } from "react-router-dom";
import { Seo } from "../Seo";
import productData from "../../constants/productData.json";
import "./Products.scss";

export function Products() {
  const headData = {
    title: "Products - WRC",
    siteTitle: "WHY? Record Company",
    url: "/products",
    imgSrc: "/images/WRC.jpg",
    description: "Hardware and software products from WHY? Record Company",
    keywords: "why, record, company, products, hardware, software, synth, midi",
  };

  const ProductsGrid = productData.map((item, index) => {
    const color =
      Math.floor(Math.random() * (Math.floor(12) - Math.ceil(1))) +
      Math.ceil(1);

    return (
      <div
        key={index}
        className="col-lg-3 col-md-4 col-sm-6 col-12 product-grid-item"
      >
        <Link to={`/product/${item.local_path}`} className="text-on-image">
          <img
            className={`img-fluid product-image-color-${color}`}
            src={item.product_image}
            alt={item.name}
          />
          <span className="centered-text">{item.name}</span>
        </Link>
      </div>
    );
  });

  return (
    <>
      <Seo data={headData} />
      <h1 className="header-sub-page">Products</h1>
      <div className="container-fluid">
        <div className="row product-grid">{ProductsGrid}</div>
      </div>
    </>
  );
}

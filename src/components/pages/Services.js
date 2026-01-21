import { Seo } from "../Seo";

export function Services() {
  const headData = {
    title: "Services - WRC",
    siteTitle: "WHY? Record Company",
    url: "/services",
    imgSrc: "/images/WRC.jpg",
    description: "Services offered by WHY? Record Company",
    keywords:
      "why, record, company, services, music production, mixing, mastering",
  };

  return (
    <>
      <Seo data={headData} />
      <h1 className="header-sub-page">Services</h1>
    </>
  );
}

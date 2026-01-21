import { Seo } from "../Seo";

export function Software() {
  const headData = {
    title: "Software - WRC",
    siteTitle: "WHY? Record Company",
    url: "/software",
    imgSrc: "/images/WRC.jpg",
    description: "Software and tools from WHY? Record Company",
    keywords: "why, record, company, software, tools, plugins, vst",
  };

  return (
    <>
      <Seo data={headData} />
      <h1 className="header-sub-page">Software</h1>
    </>
  );
}

import Helmet from "react-helmet";

const BASE_URL = "https://whyrecord.com";

export const Seo = ({ data }) => {
  // Use just the page title (e.g., "WHYCOMP001 - WRC") - don't duplicate
  const title = data.title || data.siteTitle;
  const description = data.description || "";
  const imageUrl = data.imgSrc;

  // Convert relative image paths to absolute URLs for social media
  // Always use production URL for og:image (Facebook won't fetch localhost)
  let image = "";
  if (imageUrl) {
    if (imageUrl.startsWith("http")) {
      image = imageUrl;
    } else {
      // Ensure the path starts with /
      const imagePath = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
      image = `${BASE_URL}${imagePath}`;
    }
  }

  // Build the canonical URL - always use production domain
  // data.url should already have the route prefix (e.g., /release/WHYCOMP001)
  const urlPath = data.url?.startsWith("/") ? data.url : `/${data.url || ""}`;
  const url = `${BASE_URL}${urlPath}`;
  const keywords = data.keywords || "";

  return (
    <Helmet encodeSpecialCharacters={true}>
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:secure_url" content={image} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="WHY? Record Company" />
      {/* Twitter Card tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@whyrecord" />
      {/* Facebook Pages tags */}
      <meta property="fb:pages" content="108517283862837" />
    </Helmet>
  );
};

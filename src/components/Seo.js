import Helmet from "react-helmet";

const Seo = ({ data }) => {
	const postTitle = `${data.title}`;
	const title = postTitle !== "" ? `${postTitle} - ${data.shortSiteTitle}` : data.siteTitle;
	const description = `${data.description}`;
	const imageUrl = data.imgSrc;
	// Convert relative image paths to absolute URLs for social media
	const image = imageUrl?.startsWith('http')
		? imageUrl
		: `${window.location.origin}${imageUrl?.startsWith('/') ? '' : '/'}${imageUrl}`;
	const url = `${window.location.origin}${data.url?.startsWith('/') ? data.url : `/${data.url}`}`;
	const keywords = data.keywords;

	return (
		<Helmet encodeSpecialCharacters={true}>
			{/* General tags */}
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" property="og:keywords" content={keywords} />
			{/* OpenGraph tags */}
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta property="og:image:secure_url" content={image} />
			<meta property="og:image:width" content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:type" content="website" />
			<meta property="og:site_name" content={data.siteTitle} />
			{/* Twitter Card tags */}
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:creator" content={"whyrecord"} />

			{/* Facebook Pages tags */}
			<meta property="fb:pages" content="108517283862837" />
		</Helmet>
	);
};

export default Seo;
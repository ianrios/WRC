import React from "react";
import Helmet from "react-helmet";

const Seo = props => {
	const { data } = props;

	const postTitle = `${data.title}`;
	const title = postTitle !== "" ? `${postTitle} - ${data.shortSiteTitle}` : data.siteTitle;
	const description = `${data.description}`;
	const image = data.imgSrc;
	const url = data.url;
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
			<meta property="og:type" content="website" />
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
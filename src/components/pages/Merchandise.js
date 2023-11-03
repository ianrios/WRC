import React from "react";

export default function Merchandise() {
  var js = document.createElement("script");
  js.type = "text/javascript";
  js.src =
    "https://shop.spreadshirt.no/shopfiles/shopclient/shopclient.nocache.js";
  document.body.appendChild(js);
  return (
    <>
      <h1 className="header-sub-page">Merchandise</h1>
      <div className="shopBody">
        <div id="myShop">
          <i id="spinner" className="fa fa-spinner" aria-hidden="true" />
          <p>Loading The Shop...</p>
        </div>
      </div>

      {/* Currently, we only have merchandise through a third party (spreadshop), visit <a className="no-style-link" target="_blank" rel="noopener noreferrer" href="https://shop.spreadshirt.com/whyrecordcompany">this link</a> to see all products, or click the products shown below.
			{/* add pictures of products */}
      {/*	<div className='row pt-5'>
				<div className='col-6'>
					<a className="no-style-link" target="_blank" rel="noopener noreferrer" href="https://shop.spreadshirt.com/whyrecordcompany/wrc+white+label-A5ff490dac2ee60404b73dc5e?productType=210&sellable=74DA8rwGllCrmd4ZLl29-210-7&appearance=2">
						<img className='img-fluid' src="/images/merch/blackShirtWhiteLogo.png" />
					</a>
				</div>
				<div className='col-6'>
					<a className="no-style-link" target="_blank" rel="noopener noreferrer" href="https://shop.spreadshirt.com/whyrecordcompany/2020+cancelled+usa+tour-A5ff4dbc37e83792290562d25?productType=210&sellable=yr8qzn4gOvTLnwRArAxV-210-7&appearance=2">
						<img className='img-fluid' src="/images/merch/2020Cancelled.png" />
					</a>
				</div>
			</div> */}
    </>
  );
}

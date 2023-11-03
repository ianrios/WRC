import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ArtistProfile from "./ArtistProfile";
import ArtistLanding from "./ArtistLanding";
import "./ArtistPage.scss";

export default function ArtistPage() {
  let {
    path,
    // url
  } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route path={`${path}/:artist_name/landing`}>
          <ArtistLanding />
        </Route>
        {/* TODO: create EPK path */}
        {/* <Route path={`${path}/:artist_name/epk`}>
			<ArtistEPK />
		  </Route> */}
        <Route
          exact
          path={[
            `${path}/:artist_name/profile`,
            `${path}/:artist_name`,
            `${path}/:artist_name/*`,
          ]}
        >
          <ArtistProfile />
        </Route>
      </Switch>
    </>
  );
}

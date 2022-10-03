import React from 'react'
import { Link, useParams } from 'react-router-dom';
import Seo from "../Seo"

import artistData from "../../constants/artistData.json";

export default function ArtistLinktree() {

    const { artist_name } = useParams();
    console.log(artist_name)

    const currArtist = artistData.find(i => i.local_path.toLowerCase() === artist_name.toLowerCase());
    const foundArtist = currArtist !== undefined;

    const headData = foundArtist ? {
        title: currArtist.name + " - WRC",
        shortSiteTitle: `${currArtist.name} Artist Page - WRC`,
        siteTitle: "WHY? Record Company",
        url: artist_name,
        imgSrc: currArtist.photos[0],
        description: currArtist.quote,
        keywords: "why, record, company, music, edm, techno, idm, experimental, label, artist, " + currArtist.name
    } : {
        title: "Error Page not found - WRC",
        shortSiteTitle: `Collection page not found - WRC`,
        siteTitle: "WHY? Record Company",
        url: artist_name,
        imgSrc: "error.jpg",
        description: "",
        keywords: "why, record, company, page not found"
    }
    return (
        <>
            <div className="row main-header">
                <div className="col">
                    <h1 className="header-sub-page">
                        {foundArtist
                            ? currArtist.name :
                            <>
                                <p>could not locate artist page</p>
                                <p>visit our <Link to="/errors">error page</Link> for more information, or go back to the<Link to={"/artists"}> Main Artists Page</Link></p>
                            </>
                        }
                    </h1>
                </div>
            </div>
            {
                foundArtist &&
                <>
                    <Seo data={headData} />
                    <div className="row">
                        <div class="card" >
                            <div class="row no-gutters">
                                <div class="col-4">
                                    <img src={currArtist.photos[1]} className="img-fluid" alt='artist-main-profile' />
                                </div>
                                <div class="col-8">
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-10 offset-1">
                            <h3 className="text-center">
                                Social Media
                            </h3>
                            <div className="row">
                                content
                            </div>
                        </div>
                        <div className="col-10 offset-1">
                            <h3 className="text-center">
                                Newest Release
                            </h3>
                            <div className="row">
                                content
                            </div>
                        </div>
                        <div className="col-10 offset-1">
                            <h3 className="text-center">
                                Upcoming Release
                            </h3>
                            <div className="row">
                                content
                            </div>
                        </div>
                        <div className="col-10 offset-1">
                            <h3 className="text-center">
                                Newest Set
                            </h3>
                            <div className="row">
                                content
                            </div>
                        </div>
                        <div className="col-10 offset-1">
                            <h3 className="text-center">
                                Newest Feature
                            </h3>
                            <div className="row">
                                content
                            </div>
                        </div>
                        <div className="col-10 offset-1">
                            <h3 className="text-center">
                                Newest Remix
                            </h3>
                            <div className="row">
                                content
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

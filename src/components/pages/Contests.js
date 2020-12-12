import React from 'react'
import { Link } from 'react-router-dom';
import contestData from "../../constants/contestData.json";

export default function Contests() {
    const ContestsMap = contestData.map((item, idx) => {
        return (
            <div key={idx} className="row artist-image-row">
                <div className="col-lg-6 col-md-8 col-sm-10 mx-auto text-center text-on-image">
                    <Link
                        to={`/contest/${item.local_path}`}
                    >
                        <img className="img-fluid" src={item.album_art} alt={item.name} />
                        <span className="centered-text">{item.name}</span>
                    </Link>
                </div>
            </div>
        )
    })
    return (
        <>
            <h1 className="header-sub-page">Contests</h1>
            {ContestsMap}
        </>
    )
}

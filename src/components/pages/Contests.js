import React from 'react'
import { Link } from 'react-router-dom';
import contestData from "../../constants/contestData.json";
import "./Contests.scss";

export default function Contests() {
    const ContestsGrid = contestData.map((item, index) => {
        return (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 contest-grid-item">
                <Link to={`/contest/${item.local_path}`} className="text-on-image">
                    <img className="img-fluid" src={item.album_art} alt={item.name} />
                    <span className="centered-text">{item.name}</span>
                </Link>
            </div>
        )
    })
    return (
        <>
            <h1 className="header-sub-page">Contests</h1>
            <div className="container-fluid">
                <div className="row contest-grid">
                    {ContestsGrid}
                </div>
            </div>
        </>
    )
}

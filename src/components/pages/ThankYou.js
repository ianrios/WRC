import React from 'react'
import { Link } from 'react-router-dom'

import releaseData from '../../constants/releaseData.json'
import recData from '../../constants/recData.json'
import mixData from '../../constants/mixData.json'

export default function ThankYou() {
    let startDate = new Date("2020-01-01");
    let endDate = new Date("2020-12-31");

    const renderReleases = [...releaseData, ...mixData, ...recData]
        .filter(i => {
            let date = new Date(i.release_date);
            return date >= startDate && date <= endDate
        })
        .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
        .map((r, i) => <div className='col-2' key={i}>

            <Link to={`/release/${r.local_path}`} className="artist-page-album-art-link">
                <img alt={r.name} src={r.album_art} className="img-fluid artist-page-album-art" />
                <span className="artist-page-album-art-text colored-link white-text">
                    {r.label_number}
                </span>
            </Link>

        </div>)

    return (
        <>
            <h1 className="header-sub-page">Thank You!</h1>
            <div className="row">
                <div className="col-10 offset-1">

                    2020 Links

                    <div className="row questrial d-flex flex-column">
                        <Link to="/nexus" className='btn btn-link'>Artist Nexus Page</Link>
                        <Link to="/store" className='btn btn-link'>Merchandise Page</Link>
                        <a className="no-style-link btn btn-link" target="_blank" rel="noopener noreferrer" href="https://discord.gg/ZHe4A5k">Discord Link</a>
                    </div>
                    <div className="row">
                        {renderReleases}
                        {/* add all 2020 releases here in a collage */}
                    </div>
                </div>
            </div>
        </>
    )
}

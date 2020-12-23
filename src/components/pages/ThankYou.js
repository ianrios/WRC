import React from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

export default function ThankYou() {
    const { year } = useParams();
    return (
        <>
            <h1 className="header-sub-page">Thank You!</h1>
            <div className="row">
                <div className="col-10 offset-1">

                    {2020} Links

                    <div className="row questrial d-flex flex-column">
                        <Link to="/software" className='btn btn-link'>Software Page</Link>
                        <Link to="/nexus" className='btn btn-link'>Artist Nexus Page</Link>
                        <Link to="/store" className='btn btn-link'>Merchandise Page</Link>
                        <Link to="/coming-soon" className='btn btn-link'>Coming Soon Page</Link>
                        <a className="no-style-link btn btn-link" target="_blank" rel="noopener noreferrer" href="https://discord.gg/ZHe4A5k">Discord Link</a>
                    </div>
                </div>
            </div>
        </>
    )
}

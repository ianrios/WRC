import React from 'react'
import { Link } from 'react-router-dom'

export default function Errors() {
    return (
        <div className="row center-contact">
            <div className="col-10">
                <h1 className="header-sub-page">Errors</h1>
                <div className="questrial">
                    <p >
                        If the website does not load a page that should exist,
						first <Link to="/hard-reload">try this button</Link>,
						next, try closing all tabs,
						then, try a <a target="_blank" rel="noopener noreferrer" href="https://refreshyourcache.com/en/cache/">hard reload</a>,
						and finally, opening a new incognito tab.
						If none of that works, shoot us a message.
					</p>
                    <p>You can send us an email at</p>
                    <p>
                        <a href={`mailto:admin@whyrecord.com`}>admin@whyrecord.com</a>
                    </p>
                    <p>or visit us on <Link to='/contact'>social media</Link></p>
                </div>
            </div>
        </div>
    )
}

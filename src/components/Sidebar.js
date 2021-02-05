import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { chooseIcon, titleCase } from './Link'
import './Link.scss'

function Sidebar() {
    const location = useLocation()
    const history = useHistory()

    const Links = {
        "Home": ["Question", true],
        "Artists": ["Fingerprint", true],
        "Releases": ["Dot", true],
        "Collections": ["Honeycomb", true],
        "Contests": ["Star", true],
        "Store": ["Cube", true],
        "Live": ["Live", true],
        "Nexus": ["Blockchain", true],
        "Contact": ["AtSign", true],
    }
    const linkKeys = Object.keys(Links)

    const [open, setOpen] = useState(false)
    const toggle = () => {
        setOpen(!open)
    }
    const navigate = (to) => {
        if (location.pathname !== to) {
            history.push(to);
            toggle()
        }
    }
    const navItems = linkKeys.map((item, idx) => {
        const to = `/${item}`.toLowerCase()
        return (
            <li className={`
                list-group-item
                nav-link 
                white-text
                text-left
				${!Links[item][1] && "text-nav-icon"} 
				${location.pathname.toLowerCase() === to && "nav-link-active"}
                `}
                style={{ color: "white", opacity: 1, backgroundColor: "black" }}
                onClick={() => navigate(to)}
            >
                <span style={{
                    width: "150px",
                    paddingLeft: idx === 0 ? "10px" : "",
                    marginRight: idx !== 0 ? "10px" : ""
                }}>
                    {chooseIcon({
                        iconHover: true,
                        iconText: !Links[item][1] && Links[item][0],
                        icon: Links[item][1] && item,
                        to: `/${item}`.toLowerCase(),
                        pathname: location.pathname
                    })}
                </span>
                <span className={`questrial h3 ${location.pathname.toLowerCase() === `/${item}`.toLowerCase() && "nav-link-active"}`}>{item.toLowerCase()}</span>
            </li>
        )
    })
    return (
        <ul class="list-group fixed-top"
            style={{
                width: open ? "225px" : "70px",
                backgroundColor: "black"
            }}>
            <li onClick={toggle}
                style={{ color: "white", opacity: 1, backgroundColor: "black" }}
                className={`
                list-group-item
                white-text
                text-left
                text-nav-icon
                em2`
                }>
                <span style={{ width: "150px", paddingLeft: "10px", paddingTop: "10px" }}>
                    &equiv;
                </span>
            </li>
            {open && navItems}
        </ul>
    )
}

export default Sidebar

import React from 'react'

export default function Discord({ caps, href }) {
    const url = href || "https://discord.gg/ZHe4A5k"
    const discord = (caps ? "D" : "d") + "iscord"
    return <a className="no-style-link" target="_blank" rel="noopener noreferrer" href={url}>{discord}</a>
}

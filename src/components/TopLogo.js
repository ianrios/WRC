import React from 'react'
import { useHistory } from 'react-router-dom'

function TopLogo() {
    const history = useHistory()

    return (
        <img src="/whiteLogoSmall.png"
            className="img-fluid pt-4 position-relative"
            alt="logo"
            width="75" height="75"
            style={{
                marginBottom: "-75px"
            }}
            onClick={() => history.push('/')} />
    )
}

export default TopLogo

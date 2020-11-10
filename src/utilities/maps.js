import React from 'react'
import _ from 'lodash'

export const mappedPTag = (arr, className) => {
    return arr.map((item, idx) => {
        let use = item.search("__BREAK__")
            ? item.split("__BREAK__").map((i, j) => <React.Fragment key={j}>{i} <br /></React.Fragment>)
            : item
        if (item.search("__b__") !== -1) {
            let arr = item.split("__b__")
            use = [arr[0], <b key={"b"}>{arr[1]}</b>, arr[2]]
        }
        if (item.search("__i__") !== -1) {
            let arr = item.split("__i__")
            use = [arr[0], <i key={"i"}>{arr[1]}</i>, arr[2]]
        }
        if (item.search("__email__") !== -1) {
            let arr = item.split("__email__")
            use = [arr[0], <a key={"a"}href="mailto: info@whyrecord.com?subject=Nov%20WRC%20Competition">info@whyrecord.com</a>, arr[1]]
        }
        return (
            <p
                key={idx}
                className={`questrial ${className}`}
            >
                {use}
            </p>
        )
    })
}

export const mappedObjArr = (arr, className) => {

    return (
        <dl className="row">
            {arr.map((o) => {
                return _.map(o, (i, k) => {
                    return (
                        <React.Fragment key={k}>
                            <dt className="col-sm-3">
                                {(k === "Info" || k === "Resources") && k}
                            </dt>
                            <dd className="col-sm-9">
                                {(k === "Info" || k === "Resources") ? i : (<a href={i} target="_blank" rel="noopener noreferrer">{k}</a>)}
                            </dd>
                        </React.Fragment>
                    )
                })
            })}
        </dl>
    )
}



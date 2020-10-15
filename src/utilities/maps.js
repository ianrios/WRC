import React from 'react'

export const mappedPTag = (arr, className) => {
    console.log(arr)
    return (
        arr.map((item, idx) => {
            let use = item.search("__BREAK__")
                ? item.split("__BREAK__").map((i, j) => <>{i} <br /></>)
                : item
            if (item.search("__b__") !== -1) {
                let arr = item.split("__b__")
                use = [arr[0], <b>{arr[1]}</b>, arr[2]]
            }
            if (item.search("__i__") !== -1) {
                let arr = item.split("__i__")
                use = [arr[0], <i>{arr[1]}</i>, arr[2]]
            }
            if (item.search("__email__") !== -1) {
                let arr = item.split("__email__")
                use = [arr[0], <a href="mailto: info@whyrecord.com?subject=Nov%20WRC%20Competition">info@whyrecord.com</a>, arr[1]]
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
    )
}




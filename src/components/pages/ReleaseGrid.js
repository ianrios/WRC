import releaseData from "../../constants/releaseData.json";
import "./ProductPage.scss";

export default function ReleaseGrid() {

    const length = '114px'
    let index = 0
    return (
        <>
            <div className="row main-header">
                <div className="col">
                    <h1 className="header-sub-page">

                        <p>
                            visit our for more
                            information, or go back to the

                        </p>


                    </h1>
                </div>
            </div>
            {[...Array(10).keys()].map((_i, idx) => {
                return (
                    <div className="row" key={idx}>
                        {[...Array(10).keys()].map((_j, jdx) => {
                            const r = releaseData[index]
                            // WHY75-A was made to fix the lack of WHY064 - my mistake when originally releasing
                            // WHY064 was only released on soundcloud (as of 02/12/23)
                            index += 1
                            return (
                                <div className="col" width={length} key={jdx}>
                                    {r &&
                                        <img height={length} width={length} alt={r.name} src={r.album_art} />
                                    }
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </>
    )
}

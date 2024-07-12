import { Link } from "react-router-dom";
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
                            all releases
                        </p>
                    </h1>
                </div>
            </div>

            {[...Array(11).keys()].map((_i, idx) => {
                return (
                    <div className="row" key={idx}>
                        {[...Array(10).keys()].map((_j, jdx) => {
                            const r = releaseData[index]
                            // WHY75-A was made to fix the lack of WHY064 - my mistake when originally releasing
                            // WHY064 was only released on soundcloud (as of 02/12/23)
                            index += 1
                            return (
                                <div className="col text-center remove-padding

                                " width={length} key={jdx}>
                                    {r ?
                                        <Link to={`/release/${r.local_path}`} className="artist-page-album-art-link">
                                            <img height={length} width={length} alt={r.name} src={r.album_art} className="img-fluid" />
                                            <span className=" colored-link white-text">
                                                {
                                                    //url === "release" ? 
                                                    Boolean(Number(r.label_number.split('WHY')[1])) ? Number(r.label_number.split('WHY')[1]) : r.label_number.split('WHY')[1]
                                                    // : a.name
                                                }
                                            </span>
                                        </Link>
                                        :
                                        null
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

import "./Bio.css"
import { useRecoilValue } from 'recoil';
import {detailsAtom} from "../../store/detailsAtom.jsx"


function Bio(){
    const details = useRecoilValue(detailsAtom)
    return(
        <div className="bada-bio">
        <div className="bio">
                    <div className="name"><p>{details.name} ajisbdguiawrevgiyerv</p> <br /></div>
                    <div className="user-bio"><p>{details.bio}aa asajksfwjiefjilre</p> </div>
        </div>
        <div className="acad-details">
            <div className="degree acad">{details.degree}</div>
            <div className="subject acad">{details.department}</div>
            <div className="grad-year acad">Class of {details.gradYear}</div>
        </div>
            
        </div>
    )
}

export default Bio
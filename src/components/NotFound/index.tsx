import './index.sass'
import {useNavigate} from "react-router-dom";
const NotFound = () => {
    const navigate = useNavigate()
    return <div className='error'>
        <div className="error__container">
            <div className="error__code">
                <p>4</p>
                <p>0</p>
                <p>4</p>
            </div>
            <div className="error__title">Page Not Found</div>
            <div className="error__description">
                We can't seem to find that page. It might have been removed or doesn't
                exist anymore.
            </div>
            <button className="action" onClick={() => navigate('')}>Go Home</button>
        </div>
    </div>
}

export default NotFound
import './index.sass'
import React from "react";
interface MoonToSunProps {
    status: string
}
const MoonToSun: React.FC<MoonToSunProps> = ({ status }) => {

    return (
        <>
            {status==='sun'&&<div className='BackContainer' style={{animation: 'colorchangeToSun 1s forwards'}}>
                <div className="Moon_Sun_container">
                    <div className="sun"></div>
                    <div className="moon" style={{ animation: 'timeToSun 1s forwards, colorchangeToSun 1s  forwards'}}></div>
                </div>
            </div>}

            {status==='moon'&&<div className='BackContainer' style={{animation: 'colorchangeToMoon 1s forwards'}}>
                <div className="Moon_Sun_container">
                    <div className="sun"></div>
                    <div className="moon" style={{ animation: 'timeToMoon 1s forwards, colorchangeToMoon 1s' +
                            '  forwards'}}></div>
                </div>
            </div>}
        </>
    );
}

export default MoonToSun;

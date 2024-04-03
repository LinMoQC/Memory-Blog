import './index.sass'
import BackTopButton from "../BackTopButton";
import PhoneSwitch from "../PhoneSwitch";
import React from "react";

interface BottomMenu{
    scrollHeight: number
    isDark: boolean
    setDark: (value: (((prevState: boolean) => boolean) | boolean)) => void
}
const BottomMenu: React.FC<BottomMenu> = ({scrollHeight,isDark,setDark}) => {
    return <>
        <nav className={`bottomMenu ${scrollHeight > 500 ? 'menuShow' : 'menuHide'}`}>
            <input type="checkbox" className="menu-open" name="menu-open" id="menu-open" />
                <label className="menu-open-button" htmlFor="menu-open">
                    <span className="lines line-1"></span>
                    <span className="lines line-2"></span>
                    <span className="lines line-3"></span>
                </label>

                <div  className="menu-item"><PhoneSwitch isDark={isDark} setDark={setDark}/></div>
                <div  className="menu-item"><BackTopButton /></div>
        </nav>
    </>
}

export default BottomMenu
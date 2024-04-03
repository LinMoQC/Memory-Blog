import './index.sass'
import {useEffect, useState} from "react";
import axios from "axios";

const Footer = () => {
    const [onySay,setOnsay] = useState('')
    useEffect(() => {
        axios.get('https://v1.jinrishici.com/all').then((res) => {
            setOnsay(res.data.content)
        })
    }, []);
    return <>
        <footer className='footerContainer'>
            <p>©2024 林陌青川 | LinMo</p>
            <em><p style={{marginTop: 10}}>{onySay}</p></em>
            <p style={{marginTop:10,marginBottom:10}}><a className="link" target="_blank" rel="noreferrer" href="">ICP备xxxxxxx号</a></p>
            <p>Power By <span>Memory</span></p>
        </footer>
    </>
}

export default Footer
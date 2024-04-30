import Head from  './frontHome/Head';
import { Outlet } from "react-router-dom";
import Footer from "./frontHome/Footer";
import './frontHome/main.css';
import { useEffect, useState } from "react";
import './App.sass';
import BottomMenu from "./components/BottomMenu";

function App() {
    const [isDark, setDark] = useState(false);
    const [scrollHeight, setScrollHeight] = useState(0);
    useEffect(() => {
        setDark(localStorage.getItem('isDarkMode') === 'true');
        const handleScroll = () => {
            const currentScrollHeight = window.scrollY || document.documentElement.scrollTop;
            setScrollHeight(currentScrollHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={isDark ? 'frontDark frontRoot' : 'frontRoot'}>
            <Head setDark={setDark} isDark={isDark} scrollHeight={scrollHeight}/>
            <Outlet />
            <Footer />
            <BottomMenu scrollHeight={scrollHeight} isDark={isDark} setDark={setDark}/>
        </div>
    );
}

export default App;

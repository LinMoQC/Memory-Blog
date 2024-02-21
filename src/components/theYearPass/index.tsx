import './index.sass'
import dayjs from "dayjs";
const TheYearPass = () => {
    const today = dayjs(new Date()).format('YYYY年MM月DD日');
    const calculateYearProgress = (): string => {
        const today: Date = new Date();
        const startOfYear: Date = new Date(today.getFullYear(), 0, 1); // January 1st of the current year
        const endOfYear: Date = new Date(today.getFullYear() + 1, 0, 1); // January 1st of the next year

        const totalDaysInYear: number = (endOfYear.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000); // milliseconds to days
        const daysPassed: number = (today.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000); // milliseconds to days

        const percentage: number = (daysPassed / totalDaysInYear) * 100;

        return percentage.toFixed(1); // Return the percentage as a string with one decimal place
    };

    const yearProgress: string = calculateYearProgress();



    return <div className="process_container">
        <div className="today">
            <div className="process" style={{width: `${yearProgress}%`}}></div>
            <p className="em_today">😊</p>
            <p className="time_today">{today}</p>
            <p className="say_today">新的一天，今天也要加油呦！</p>
            <span className="percent_progress">{yearProgress}%</span>
        </div>
        </div>
}

export default TheYearPass
import { Pie } from '@ant-design/charts';
import {useEffect, useState} from "react";
import { Line } from '@ant-design/plots';
import './index.sass'

// 假设这里的 data 是你的文章分类及其对应的数量数据
const CategoriesData = [
    {
        key: '1',
        categorie_title: '技术',
        introduce: '关于编程、开发、技术趋势等的博客文章',
        icon: 'icon-code1',
        note_count: 2,
        color: '#3498db',
    },
    {
        key: '2',
        categorie_title: '设计',
        introduce: '设计原理、用户界面设计、用户体验等方面的博客文章',
        icon: 'icon-sheji1',
        note_count: 10,
        color: '#2ecc71',
    },
    {
        key: '3',
        categorie_title: '生活',
        introduce: '个人生活、日常琐事、旅行日记等的博客文章',
        icon: 'icon-icon',
        note_count: 12,
        color: '#e74c3c',
    },
    {
        key: '4',
        categorie_title: '健康',
        introduce: '健康生活、运动、饮食等方面的博客文章',
        icon: 'icon-jiankang',
        note_count: 21,
        color: '#f39c12',
    },
    {
        key: '5',
        categorie_title: '文学',
        introduce: '文学创作、书评、阅读感想等的博客文章',
        icon: 'icon-wenxue2',
        note_count: 7,
        color: '#9b59b6',
    },
    {
        key: '6',
        categorie_title: '学术',
        introduce: '学术研究、学科探讨等的博客文章',
        icon: 'icon-xueshuquan',
        note_count: 19,
        color: '#34495e',
    },
    {
        key: '7',
        categorie_title: '音乐',
        introduce: '音乐欣赏、乐器演奏、音乐创作等的博客文章',
        icon: 'icon-yinle',
        note_count: 4,
        color: '#e67e22',
    }
];

const notes = [
    { "Date": "2022-01", "scales": 38 },
    { "Date": "2022-02", "scales": 22 },
    { "Date": "2022-03", "scales": 40 },
    { "Date": "2022-04", "scales": 27 },
    { "Date": "2022-05", "scales": 36 },
    { "Date": "2022-06", "scales": 43 },
    { "Date": "2022-07", "scales": 32 },
    { "Date": "2022-08", "scales": 25 },
    { "Date": "2022-09", "scales": 39 },
    { "Date": "2022-10", "scales": 21 },
    { "Date": "2022-11", "scales": 44 },
    { "Date": "2022-12", "scales": 37 },
    { "Date": "2023-01", "scales": 29 },
    { "Date": "2023-02", "scales": 40 },
    { "Date": "2023-03", "scales": 33 },
    { "Date": "2023-04", "scales": 42 },
    { "Date": "2023-05", "scales": 23 },
    { "Date": "2023-06", "scales": 35 },
    { "Date": "2023-07", "scales": 20 },
    { "Date": "2023-08", "scales": 37 },
    { "Date": "2023-09", "scales": 26 },
    { "Date": "2023-10", "scales": 41 },
    { "Date": "2023-11", "scales": 30 },
    { "Date": "2023-12", "scales": 38 },
    { "Date": "2024-01", "scales": 24 }
];


const Analytice = () => {
    const [data, setData] = useState(notes);

    useEffect(() => {
        setData(notes)
    })

    const config2 = {
        data,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            label: {
                rotate: Math.PI / 2, // 将 x 轴标签旋转 90 度
            },
        },
        smooth: true,
    };


    const config1 = {
        appendPadding: 10,
        data: CategoriesData,
        angleField: 'note_count',
        colorField: 'categorie_title',
        radius: 0.8,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{name} {percentage}',
            style: {
                textAlign: 'center',
                fontSize: 14,
                fill: '#fff',
            },
        },
        interactions: [{ type: 'element-active' }],
    };

    return (
        <div style={{padding: 20}}  className='analyticsBody'>
            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                <h2 style={{textDecoration: 'underline wavy #ce7397',marginBottom: 20}}>月更统计</h2>
                <div style={{height: 400 }} className='monthAnalytics'>
                    <Line {...config2} />
                </div>
            </div>

            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                <h2 style={{textDecoration: 'underline wavy #e84749',marginBottom: 20}}>分类统计</h2>
            <div style={{ height: 400 }} className='categoriesAnalytics'>
                <Pie {...config1} />
                </div>
            </div>
        </div>
    );
};

export default Analytice

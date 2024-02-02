import InfiniteScroll from 'react-infinite-scroll-component';
import './index.sass'
import {Card} from "antd";
import DeleteButton from "../../../components/Buttons/DeleteButton";
import UpLoadButton from "../../../components/Buttons/UpLoadButton";

interface ImgUrl {
    title?:string
    key: number
    url: string
}

const source: ImgUrl[] = [
    {
        key: 1,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/06df2f82eaba7b4ea9c7eb13e1f00eba.png',
    },
    {
        key: 2,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/0bb4f277217ab460dea37d4ab0b9b08b.jpg',
    },
    {
        key: 3,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/0e41836c5e4908002d25c38217ca7e92.jpg',
    },
    {
        key: 4,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/1628740117208.png',
    },
    {
        key: 5,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/1656780415433.png',
    },
    {
        key: 17,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/33a1d238f41bcd6994390b5a52067cd6.png',
    },
    {
        key: 19,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/3c850b578662bff5.png',
    },
    {
        key: 20,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/56073c0753a31b8b86456a78d04b2751.jpg',
    },
    {
        key: 21,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/57c361dffb69422683325d589a95f5bd.png',
    },
    {
        key: 22,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7bb6346225d07aa8d204bd4854615d9b.jpg',
    },
    {
        key: 23,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7ea0a31aea6a8654ced9bee94228e7d8.jpg',
    },
    {
        key: 24,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7eb9fece77081700ef0bf31d7099cea0.png',
    },
    {
        key: 25,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/7f54217ed1bd89b3138393c4bf12e965.png',
    },
    {
        key: 26,
        url: 'https://cdn.jsdelivr.net/gh/LinMoQC/cdn@master/83198143a70ead70d55a0ca48f90ff92.png',
    },
];


const Albums = () => {
    const fetchData = () => {
        // Implement your logic to fetch more data
    };
    const handleupload = () => {

    }

    return <div style={{height: '100%'}}>
        <InfiniteScroll
        dataLength={source.length}
        next={fetchData}
        hasMore={true}
        loader={null}
        endMessage={
            <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
            </p>
        }
    >
            <div style={{display: "flex",flexDirection: 'row',alignItems:'center',justifyContent: 'space-around',marginTop: 30,marginBottom:0}} className={"action"}>
                <UpLoadButton onClick={handleupload} />
                <div style={{ display: "flex", flexDirection: 'row', alignItems: 'center' }}>
                    <h2 style={{display: "flex", flexDirection: 'row', alignItems: 'center'}}> <i className="iconfont icon-xiangce icon" style={{ fontWeight: '80', fontSize: 50, color: '#1668dc' }} /> 图库  </h2>
                </div>
                <DeleteButton />
            </div>
            <Card style={{width: '100%',height: '86vh',marginLeft: '0%',marginTop: '0%',overflowY: 'scroll',backgroundColor: 'transparent',border: "none"}}>
                {source.map(item => (
                    <img key={item.key} src={item.url} alt={item.title} style={{maxWidth:250,maxHeight: 250 ,margin: 40,marginTop: 30,borderRadius: 10}} className='imgShade'/>
                ))}
            </Card>
    </InfiniteScroll>
    </div>
}

export default Albums
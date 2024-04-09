import './index.sass'
import {useEffect, useState} from "react";
import {Friend} from "../../../interface/FriendType";
import {Button, message} from "antd";
import { motion } from 'framer-motion';
import scrollToTop from "../../../utils/scrollToTop.tsx";
import {applyFor, getFriendsList} from "../../../apis/FriendMethods.tsx";
const FriendList = () => {
    const [Friends,setFriends] = useState<Friend[]>([])
    useEffect(() => {
        scrollToTop();
        initFriendsList()
    },[]);

    const initFriendsList = () => {
        getFriendsList().then((res) => {
            setFriends(res.data.data)
        }).catch(() => {
            message.error("获取失败")
        });
    }

    return <div className='FriendsContainer'>

        <div className="FriendList">
            <h3>Friends</h3>
            <ul className='link-items' style={{gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))'}}>
                {Friends.filter(item=>item.status === 1).map((item,index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 ,ease: "linear"}}
                        className="article"
                        style={{position:'relative'}}
                    >
                        <a key={item.friendKey} href={item.siteUrl} target='_blank'><li className='link-item'>
                            <div style={{ position: 'absolute', right: 5, top: 5 }}>
                            </div>
                            <img
                                alt={item.siteName}
                                className="lazyload"
                                data-src={item.avatar}
                                src={item.avatar}
                            />
                            <br />
                            <span className="sitename">{item.siteName}</span>
                            <div className="linkdes">{item.description}</div>

                        </li></a></motion.div>))}
            </ul>
        </div>
        <div className="applyFriend">
            <div className="applyForm">
                <ApplyForm />
            </div>
        </div>
    </div>
}

const ApplyForm = () => {
    const [formData, setFormData] = useState({
        siteName: '',
        siteUrl: '',
        avatar: '',
        description: ''
    });

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        apply(formData as Friend);
    };

    const apply = (value:Friend) => {
        if(!formData.siteUrl||!formData.siteName||!formData.avatar||!formData.description){
            message.warning('请填写完整')
        }else{
            applyFor(value).then((res) => {
                if(res.status === 200){
                    message.success("申请成功,请耐心等待回复")
                }
            })
        }
    };

    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <h4 style={{marginBottom:10}}>期待你的加入~</h4>
            <form style={{ height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} method='post' onSubmit={handleSubmit}>
                <p className="input-container">
                    <input type="text" placeholder="站点名称" name="siteName" value={formData.siteName} onChange={handleInputChange} className="input-field" autoComplete="name"/>
                </p>
                <p className="input-container">
                    <input type="text" placeholder="站点链接" name="siteUrl" value={formData.siteUrl} onChange={handleInputChange} className="input-field" autoComplete="name"/>
                </p>
                <p className="input-container">
                    <input type="text" placeholder="站点Logo" name="avatar" value={formData.avatar} onChange={handleInputChange} className="input-field" autoComplete="name"/>
                </p>
                <p className="input-container">
                    <input type="text" placeholder="站点描述" name="description" value={formData.description} onChange={handleInputChange} className="input-field" autoComplete="name"/>
                </p>
                <div style={{ display: 'flex', justifyContent: "center" }}>
                    <Button style={{ width: '100px' }} htmlType={'submit'}>申请</Button>
                </div>
            </form>
        </div>
    );
};


export default FriendList
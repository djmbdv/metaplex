import React,{useRef,useState, MutableRefObject} from 'react';
import { Button,Col,Row } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { CardLoader } from '../../../../components/MyLoader';
import { CardComponent } from '../../../../components/Card';


export interface Card {
    _id?:string;
    pubkey: string;
    image:string;
    name:string;
    description:string;
    price?:string;
    items?:string;
    size?:string;
}


export const CardSliderComponent = (props)=>{
    const {loading,data} =props;
    const [active,setActive] =useState(2)
    const sliderCard = useRef() as MutableRefObject<HTMLInputElement>;
    console.log(data);
    const handleClickRigth =(event)=>{
        sliderCard.current.scrollLeft += 10;
        console.log(data)
    }
    const handleClickLeft =(event)=>{
        sliderCard.current.scrollLeft -= 10;
        console.log(sliderCard.current.offsetWidth)
    }
    return(
        <>
        <div className="slider-wrap" ref={sliderCard}>
           {loading &&   [...Array(5)].map((_, idx) => <Col span={5}><CardLoader key={idx} width={200} height={370} /></Col>)}
           {!loading &&  data.map((c:Card, idx) => <Col span={6}><CardComponent key={idx} description={c.description} posterUri={c.image} items={c.size} price={c.price} name={c.name} link={'/launchpad/' + c._id}  pubkey={c.pubkey} /></Col>)}
           
           </div>
           <Button type="primary" className="sliderCard-btnLeft" shape="circle" onClick={handleClickLeft} >
                <LeftOutlined />
            </Button>
           <Button type="primary" className="sliderCard-btnRigth" shape="circle" onClick={handleClickRigth} >
                <RightOutlined />
            </Button>
        </>
    )
}
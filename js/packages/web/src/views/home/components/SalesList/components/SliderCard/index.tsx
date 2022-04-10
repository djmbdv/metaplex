import React,{useEffect, useRef, useState, MutableRefObject ,MouseEvent} from 'react';
import { CardLoader } from '../../../../../../components/MyLoader';
import {Row,Col} from'antd';
import { Button} from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import CardComponent from '../Card';
import { Typography } from 'antd';

const { Title } = Typography;

export interface Card {
    pubkey: string;
    image:string;
    name:string;
    description:string;
}

export const SliderCard =(props)=>{
    const {data,loading,title} = props
    const [cardDat,setCardDat]=useState(data);
    /* const [isLoanding,setIsLoading] = useState(true); */
    const [active,setActive] =useState(2)
    const sliderCard = useRef() as MutableRefObject<HTMLInputElement>;
   

    const handleClickRigth =(event)=>{
        sliderCard.current.scrollLeft += 10;
        console.log(sliderCard)
        console.log(cardDat)
    }
    const handleClickLeft =(event)=>{
        sliderCard.current.scrollLeft -= 10;
        console.log(sliderCard.current.offsetWidth)
    }
    const changeFilter = ( ev : MouseEvent<HTMLDivElement> ) =>{
        const { id  } = ev.currentTarget;
        setActive(parseInt(id));
    }
    return(
        <>
        <Row> 
            <Col span={6}>
                <Title level={2} className="filterTitle" >Launchpad Drops</Title>
            </Col>
            <Col span={8}>
                <Row className='sliderFilter-wrap'>
                    <Col id="1" className={ active !== 1 ? 'itemFilter ': 'itemFilter activeFilter'} onClick={changeFilter} span={8}>Next 7 dias</Col>
                    <Col id="2" className={ active !== 2 ? 'itemFilter ': 'itemFilter activeFilter'} onClick={changeFilter} span={8}>Coming soon</Col>
                    <Col id="3" className={ active !== 3 ? 'itemFilter ': 'itemFilter activeFilter'} onClick={changeFilter} span={8}>Live</Col>
                </Row>
            </Col>  
        </Row>
        <div className="slider-wrap" ref={sliderCard}>
           {loading &&   [...Array(5)].map((_, idx) => <Col span={5}><CardLoader key={idx} width={200} height={370} /></Col>)}
           {!loading &&  cardDat.map((c:Card, idx) => <Col span={5}><CardComponent key={idx} description={c.description} posterUri={c.image} name={c.name}  pubkey={c.pubkey} /></Col>)}
           
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
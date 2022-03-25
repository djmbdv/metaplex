import React,{useEffect, useRef, useState, MutableRefObject } from 'react';
import { CardLoader } from '../../../../../../components/MyLoader';
import {Row,Col} from'antd';
import { Button} from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import CardComponent from '../Card';

export interface Card {
    pubkey: string;
    image:string;
    name:string;
    description:string;
}

export const SliderCard =()=>{
    const [cardDat,setCardDat]=useState([]);
    const [isLoanding,setIsLoading] = useState(true);
    const sliderCard = useRef() as MutableRefObject<HTMLInputElement>;
    useEffect(()=>{
        const onLoad = async () => {
           let resp =  await fetch('https://apinft.proit.studio/all_nfts')
           let json = await resp.json();
           setCardDat(json);
           setIsLoading(false);
           
          };
          onLoad()
          /* window.addEventListener('load', onLoad);
          return () => window.removeEventListener('load', onLoad);*/
    },[]) 

    const handleClickRigth =(event)=>{
        sliderCard.current.scrollLeft += 10;
        console.log(sliderCard)
        console.log(cardDat)
    }
    const handleClickLeft =(event)=>{
        sliderCard.current.scrollLeft -= 10;
        console.log(sliderCard.current.offsetWidth)
    }
    return(
        <><div className="slider-wrap" ref={sliderCard}>
           {isLoanding &&   [...Array(5)].map((_, idx) => <Col span={5}><CardLoader key={idx} width={200} height={370} /></Col>)}
           {!isLoanding &&  cardDat.map((c:Card, idx) => <Col span={5}><CardComponent key={idx} description={c.description} posterUri={c.image} name={c.name}  pubkey={c.pubkey} /></Col>)}
           
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
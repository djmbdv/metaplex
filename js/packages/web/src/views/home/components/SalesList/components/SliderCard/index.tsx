import React,{useEffect, useState } from 'react';
import { CardLoader } from '../../../../../../components/MyLoader';
import {Row,Col} from'antd';
import { Button} from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

export const SliderCard =()=>{
    const [cardDat,setCardDat]=useState();
    const [isLoanding,setIsLoading] = useState(true);
    useEffect(()=>{
        const onLoad = async () => {
           let resp =  await fetch('https://apinft.proit.studio/all_nfts')
           let json = await resp.json();
           setCardDat(json);
           setIsLoading(false);
           
          };
          window.addEventListener('load', onLoad);
          return () => window.removeEventListener('load', onLoad);
    },[])
    return(
        <>{!isLoanding && <div className="slider-wrap">
            {  [...Array(5)].map((_, idx) => <Col span={5}><CardLoader key={idx} width={200} height={370} /></Col>)}
           </div> }
           {!isLoanding && <div className="slider-wrap">
            {  [...Array(5)].map((_, idx) => <Col span={5}><CardLoader key={idx} width={200} height={370} /></Col>)}
            
           </div> }
        
           <Button type="primary" shape="circle">
                <RightOutlined />
            </Button>
        </>
    )
}
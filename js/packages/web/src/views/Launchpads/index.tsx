import React,{useEffect, useState} from 'react';
import {Layout,Row, Col} from 'antd';
import { Banner } from '../../components/Banner';
import { HowToBuyModal } from '../../components/HowToBuyModal';
import { useSales } from '../home/components/SalesList/hooks/useSales';
import { LiveAuctionViewState } from './enum';
import { CardSliderComponent } from './components/card-slider';
import { Typography } from 'antd';

const { Title } = Typography;


export const LaunchpadsView = () =>{
    let live  =  LiveAuctionViewState.Ended
    const [cardDat,setCardDat] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    /* const { sales, hasResaleAuctions } = useSales(live);
    console.log(sales); */

    useEffect(()=>{
        const onLoad = async () => {
           let resp =  await fetch('https://api-mainnet.magiceden.io/launchpad_collections');
           let json = await resp.json();
           console.log(json);
           setCardDat(json);
           setIsLoading(false);
           
          };
          onLoad()
          /* window.addEventListener('load', onLoad);
          return () => window.removeEventListener('load', onLoad);*/
    },[]) 

    return(
        <Layout style={{ margin: 0, marginTop: 40 }}>
            <Row justify='center' >
                <Col span={20}>
                <Banner
                    src="/main-banner.svg"
                    headingText="No te pierdas la oportunidad de entrar al mundo de los NFT."
                    subHeadingText="Compra NFTs de tus artistas favoritos."
                    actionComponent={<HowToBuyModal buttonClassName="secondary-btn" />}
                    useBannerBg
                />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row><Title>Live</Title></Row>
                    <CardSliderComponent data={cardDat} loading={isLoading} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row><Title>Upcoming</Title></Row>
                    <CardSliderComponent data={cardDat} loading={isLoading} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Row><Title>Ended</Title></Row>
                    <CardSliderComponent data={cardDat} loading={isLoading} />
                </Col>
            </Row>
        </Layout>
    )
}
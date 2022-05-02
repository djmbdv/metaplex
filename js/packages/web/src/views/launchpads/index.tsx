import React,{useEffect, useState} from 'react';
import {Layout,Row, Col} from 'antd';
import { Banner } from '../../components/Banner';
import { HowToBuyModal } from '../../components/HowToBuyModal';;
import { LiveAuctionViewState } from './enum';
import { CardSliderComponent } from './components/card-slider';
import { Typography } from 'antd';
import { CardComponent } from '../../components/Card';
const { Title } = Typography;


export const LaunchpadsView = () =>{
    let live  =  LiveAuctionViewState.Ended
    const [cardDat,setCardDat] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        const onLoad = async () => {
           let resp =  await fetch('https://api-mainnet.magiceden.io/launchpad_collections');
           let json = await resp.json();
           console.log(json);
           setCardDat(json);
           setIsLoading(false);
           
          };
          onLoad().catch(e => console.log(JSON.stringify(e)))
    },[]) 

    return(
        <Layout style={{ margin: 0, marginTop: 40 }}>
            <Row justify='center' >
                <Col span={20}>
                <Banner
                    src="/image4.jpg"
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
                    <Col span={6}>
                    <CardComponent key={1} description={"Louis  XV deVenoge Collection"} posterUri={"https://fmzelq6ejcd2o5qodi3r6vjjefpoaxvdplfkbhd3trfoqlkqhe.arweave.net/KzJFw8RIh6d2Dho3H1_UpIV7gXqN6yqCce5xK6C1QOc?ext=gif"} items={1} price={0.001} name={"Louis XV"} link={'/launchpad/1' }  pubkey={"1"} />
                    </Col>
                    {/*<CardSliderComponent data={cardDat} loading={isLoading} />*/}
                </Col>
            </Row>
        </Layout>
    )
}
import React,{useEffect, useState} from 'react';
import {Layout,Row, Col} from 'antd';
import { Banner } from './components/Banner';
import { GoToLaunchpad } from './components/BtnGotoLaunchpad';;
import { LiveAuctionViewState } from './enum';
import { CardSliderComponent } from './components/card-slider';
import { Typography } from 'antd';
import { CardComponent } from '../../components/Card';
const { Title } = Typography;


export const LaunchpadsView = () =>{
    let live  =  LiveAuctionViewState.Ended
    const [cardDat,setCardDat] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    // useEffect(()=>{
    //     const onLoad = async () => {
    //        let resp =  await fetch('https://api-mainnet.magiceden.io/launchpad_collections');
    //        let json = await resp.json();
    //        console.log(json);
    //        setCardDat(json);
    //        setIsLoading(false);
           
    //       };
    //       onLoad().catch(e => console.log(JSON.stringify(e)))
    // },[]) 

    return(
        <Layout className='launchpad'>
            <Row justify='center' className="launchpad-banner" >
                <Col md={20} xs={24}>
                <Banner
                    src="/image4.jpg"
                    headingText="Louis XV"
                    subHeadingText="Luis XV deVenoge Brut 2028 collection"
                    actionComponent={<GoToLaunchpad buttonText="GO TO LAUNCHPAD" buttonClassName="secondary-btn" />}
                    useBannerBg
                />
                </Col>
            </Row>
            <Row className='launchpad-card'>
                <Col>
                    <Row><Title>Live</Title></Row>
                    <Col span={6}>
                    <CardComponent key={"1"} description={"Louis  XV deVenoge Collection"} posterUri={"https://fmzelq6ejcd2o5qodi3r6vjjefpoaxvdplfkbhd3trfoqlkqhe.arweave.net/KzJFw8RIh6d2Dho3H1_UpIV7gXqN6yqCce5xK6C1QOc?ext=gif"} items={"1000"} price={"0.001"} name={"Louis XV"} link={'/launchpad/1' }  pubkey={"1"} />
                    </Col>
                    {/*<CardSliderComponent data={cardDat} loading={isLoading} />*/}
                </Col>
            </Row>
        </Layout>
    )
}
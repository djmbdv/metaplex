import { useWallet } from '@solana/wallet-adapter-react';
import { Col, Layout, Row, Tabs } from 'antd';
import React, { useState,useEffect } from 'react';
import Masonry from 'react-masonry-css';

import { useMeta } from '../../../../contexts';
import { CardLoader } from '../../../../components/MyLoader';
import { Banner } from '../../../../components/Banner';
import { HowToBuyModal } from '../../../../components/HowToBuyModal';
import { SliderCard } from './components/SliderCard';

import { useSales } from './hooks/useSales';
import SaleCard from './components/SaleCard';

const { TabPane } = Tabs;
const { Content } = Layout;

export enum LiveAuctionViewState {
  All = '0',
  Participated = '1',
  Ended = '2',
  Resale = '3',
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export const SalesListView = () => {
  const [activeKey, setActiveKey] = useState(LiveAuctionViewState.All);
  const { isLoading } = useMeta();
  const { connected } = useWallet();
  const [isLoad,setIsload]=useState(true);
  const { sales, hasResaleAuctions } = useSales(activeKey);
  const [cardDat,setCardDat]=useState([]);

//   useEffect(()=>{
//     const onLoad = async () => {
//        let resp =  await fetch('https://apinft.proit.studio/all_nfts')
//        let json = await resp.json();
//        setCardDat(json);
//        setIsload(false);
       
//       };
//       onLoad()
//       /* window.addEventListener('load', onLoad);
//       return () => window.removeEventListener('load', onLoad);*/
// },[]) 

  return (
    <>
    <Layout style={{ margin: 0, marginTop: 30 }} >
      <Banner
        src="/image4.png"
        headingText="No te pierdas la oportunidad de entrar al mundo de los NFT."
        subHeadingText="Compra NFTs de tus artistas favoritos."
        actionComponent={<HowToBuyModal buttonClassName="secondary-btn" />}
        useBannerBg
      />
      
        <Content style={{ display: 'flex', flexWrap: 'wrap',color:'#000' }}>
          <Col style={{ width: '100%', marginTop: 64 }}>
            <Row>
              <Tabs
                activeKey={activeKey}
                onTabClick={key => setActiveKey(key as LiveAuctionViewState)}
              >
                <TabPane
                  tab={
                    <>
                      <span className="live"></span> Live
                    </>
                  }
                  key={LiveAuctionViewState.All}
                ></TabPane>
                {hasResaleAuctions && (
                  <TabPane
                    tab="Secondary Marketplace"
                    key={LiveAuctionViewState.Resale}
                  ></TabPane>
                )}
                <TabPane tab="Ended" key={LiveAuctionViewState.Ended}></TabPane>
                {connected && (
                  <TabPane
                    tab="Participated"
                    key={LiveAuctionViewState.Participated}
                  ></TabPane>
                )}
              </Tabs>
            </Row>
            <Row>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
              >
                {isLoading &&
                  [...Array(4)].map((_, idx) => 
                  <CardLoader key={idx} />
                  )}
                {!isLoading &&
                  sales.map((sale, idx) =>

                   <SaleCard sale={sale} key={idx} />
                   )}
                   
              </Masonry>
            </Row>
            {/* <SliderCard data={cardDat} loading={isLoad} /> */}
          </Col>
        </Content>
      </Layout>
    </>
  );
};

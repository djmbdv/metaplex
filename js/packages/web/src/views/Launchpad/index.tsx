import { Layout,Row,Col } from 'antd';
import React from 'react';
import { useStore } from '@oyster/common';
import { useMeta } from '../../contexts';
import { Menu } from 'antd';
import { Collapse } from 'antd';
import { Button } from 'antd';
import { CachedImageContent } from '../../components/ArtContent';
import { Typography } from 'antd';
import { TabsInfo } from './components/tabs-info';
import { InfoLaunchpad } from "./info-launchpad";

const { Title, Paragraph } = Typography;

const { Panel } = Collapse;
/* import { SalesListView } from './components/SalesList';
import { SetupView } from './setup'; */

export const LaunchpadView = () => {
  /* const { isLoading, store } = useMeta();
  const { isConfigured } = useStore(); */

  return (
    <Layout style={{ margin: 0, marginTop: 30 }}>
    <Row>
   <Col span={12}>
       <Row><Col><Button size="small">FEATURED LAUNCH</Button></Col></Row>
       <Row><Col><Title>Collection Launch</Title></Col></Row>
       <Row>
           <Col><Button>VERIFIED</Button></Col>
           <Col><Button>ESCROW 15D</Button></Col>
           <Col><p>TOTAL ITEMS 10,000</p></Col>
           <Col><Button></Button></Col>
           <Col><Button></Button></Col>
           <Col><Button></Button></Col>
           <Col><Button></Button></Col>
       </Row>
       <Row><Col span={20}>
           <Paragraph > 
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quia facilis et magnam, libero eum nostrum minima exercitationem odio reiciendis mollitia, vero fugit delectus a ut nisi dolorum ea obcaecati.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quia facilis et magnam, libero eum nostrum minima exercitationem odio reiciendis mollitia, vero fugit delectus a ut nisi dolorum ea obcaecati.
            </Paragraph>
            </Col></Row>
   </Col>
   <Col span={12}>
       <Row><Col span={20} >
           <CachedImageContent
           uri="https://bafybeickbpg5rorsgxncosshr3gicib776imvitz35o2sozkr7qisvx4gm.ipfs.nftstorage.link/"
           className="auction-image no-events"
           preview={false}
            />
           </Col></Row>
       <Row><Col span={20} ></Col></Row>

   </Col>
</Row>
<Row>
   <Col span={12}>
       <Row >
           <Col span={20} >
            <InfoLaunchpad />
           </Col>
       </Row>
   </Col>
   <Col span={12}>
       <Row justify="center">
           <Col span={20} >
               <TabsInfo />
           </Col>
       </Row>
   </Col>
</Row>
</Layout>

  );
};
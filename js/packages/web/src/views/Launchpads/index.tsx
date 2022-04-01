import React from 'react';
import {Layout,Row, Col} from 'antd';
import { Banner } from '../../components/Banner';
import { HowToBuyModal } from '../../components/HowToBuyModal';


export const LaunchpadsView = () =>{
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
                <Col></Col>
            </Row>
        </Layout>
    )
}
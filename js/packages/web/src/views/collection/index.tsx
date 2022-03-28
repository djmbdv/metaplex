import React from 'react';
import {Layout,Row, Col,Button} from 'antd';
import { CachedImageContent } from '../../components/ArtContent';
import { Typography } from 'antd';

const { Title } = Typography;


const CollectionView = () =>{
    return(
        <Layout style={{ margin: 0, marginTop: 30 }}>
        <Row>
            <Col span={12}>
                <Row><Col><Button>FEATURED LAUNCH</Button></Col></Row>
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
                <Row><Col span={20}><p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quia facilis et magnam, libero eum nostrum minima exercitationem odio reiciendis mollitia, vero fugit delectus a ut nisi dolorum ea obcaecati.</p></Col></Row>
            </Col>
            <Col span={12}>
                <Row><Col span={20} ></Col></Row>
                <Row><Col span={20} ></Col></Row>

            </Col>
        </Row>
        <Row>
            <Col span={12}></Col>
            <Col span={12}></Col>
        </Row>
    </Layout>
    )
} 

export default CollectionView
import React from 'react';
import {Row, Col, Layout,Button} from 'antd';
import { CachedImageContent } from '../../components/ArtContent';
import { Typography } from 'antd';

const { Title } = Typography;

const CollectionsView = ()=>{

    return(
        <Layout style={{ margin: 0, marginTop: 30 }}>
            <Row>
                <Col span={12}>
                    <Row><Col><Button></Button></Col></Row>
                </Col>
                <Col span={12}></Col>
            </Row>
            <Row>
                <Col span={12}></Col>
                <Col span={12}></Col>
            </Row>
        </Layout>
    )

}

export default CollectionsView
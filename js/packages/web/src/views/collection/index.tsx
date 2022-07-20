import React from 'react';
import { Layout, Row, Col, Button } from 'antd';
import { CachedImageContent } from '../../components/ArtContent';
import { Typography } from 'antd';

const { Title } = Typography;

export const CollectionView = () => {
  return (
    <Layout style={{ margin: 0, marginTop: 30 }}>
      <Row>
        <Col span={12}>
          <Row></Row>
          <Row justify="center">
            <Col>
              <Title>Collection</Title>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={20}></Col>
          </Row>
          <Row>
            <Col span={20}></Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={20}></Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}></Col>
            <Col span={12}></Col>
          </Row>
        </Col>
      </Row>
    </Layout>
    //art
    //auctions
  );
};

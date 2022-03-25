import { Layout,Row,Col } from 'antd';
import React from 'react';
import { useStore } from '@oyster/common';
import { useMeta } from '../../contexts';
import { Menu } from 'antd';
import { Collapse } from 'antd';
import { Button } from 'antd';

const { Panel } = Collapse;
/* import { SalesListView } from './components/SalesList';
import { SetupView } from './setup'; */

export const LaunchpadView = () => {
  /* const { isLoading, store } = useMeta();
  const { isConfigured } = useStore(); */

  return (
    <Layout style={{ margin: 0, marginTop: 30 }}>
        <Row> 
            {/* imagen */}
            <Col span={12}>
                <Row></Row>
                {/* historia del precio */}
                <Row>
                <Col span={22} >
                <Collapse >
                        <Panel header="Price History" key="1">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus inventore perspiciatis delectus vero, minus ex veniam recusandae quis. Ad fugiat laboriosam voluptates placeat cupiditate nesciunt, consequatur delectus itaque esse aspernatur.</p>
                        </Panel>
                    </Collapse>
                    </Col>
                </Row>
            </Col>
            {/* Datos del NFT */}
            <Col span={12}>
                {/* identificacion de NTF */}
                <Row></Row>
                {/* precio de NFT */}
                <Row>
                    <Col span={20} >
                        <Row><Col>Current Price</Col></Row>
                        <Row><Col>20.90 SOL</Col></Row>
                        <Button type="primary" block >Connect Wallet</Button>
                    </Col>
                </Row>
                {/* Description del NTF */}
                <Row>
                    <Col span={24} >
                <Collapse >
                        <Panel header="About Colletion" key="1">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus inventore perspiciatis delectus vero, minus ex veniam recusandae quis. Ad fugiat laboriosam voluptates placeat cupiditate nesciunt, consequatur delectus itaque esse aspernatur.</p>
                        </Panel>
                    </Collapse>
                    </Col>
                </Row>
                {/* Atributos */}
                <Row>
                    <Col span={24} >
                    <Collapse >
                        <Panel header="Attributes" key="1">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus inventore perspiciatis delectus vero, minus ex veniam recusandae quis. Ad fugiat laboriosam voluptates placeat cupiditate nesciunt, consequatur delectus itaque esse aspernatur.</p>
                        </Panel>
                    </Collapse>
                    </Col>
                </Row>
                {/* Detalles */}
                <Row>
                <Col span={24} >
                <Collapse >
                        <Panel header="Details" key="1">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus inventore perspiciatis delectus vero, minus ex veniam recusandae quis. Ad fugiat laboriosam voluptates placeat cupiditate nesciunt, consequatur delectus itaque esse aspernatur.</p>
                        </Panel>
                    </Collapse>
                    </Col>
                </Row>
            </Col>
        
        </Row>
        {/* No offers yet */}
        <Row>
        <Col span={24} >
                <Collapse >
                        <Panel header="No offers yet" key="1">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus inventore perspiciatis delectus vero, minus ex veniam recusandae quis. Ad fugiat laboriosam voluptates placeat cupiditate nesciunt, consequatur delectus itaque esse aspernatur.</p>
                        </Panel>
                    </Collapse>
                    </Col>
        </Row>
        {/* Activities */}
        <Row>
        <Col span={24} >
                <Collapse >
                        <Panel header="Activities" key="1">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus inventore perspiciatis delectus vero, minus ex veniam recusandae quis. Ad fugiat laboriosam voluptates placeat cupiditate nesciunt, consequatur delectus itaque esse aspernatur.</p>
                        </Panel>
                    </Collapse>
                    </Col>
        </Row>
        {/* more colletions */}
        <Row>
        <Col span={24} >
                <Collapse >
                        <Panel header="More from this collection" key="1">
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus inventore perspiciatis delectus vero, minus ex veniam recusandae quis. Ad fugiat laboriosam voluptates placeat cupiditate nesciunt, consequatur delectus itaque esse aspernatur.</p>
                        </Panel>
                    </Collapse>
                    </Col>
        </Row>
        
        </Layout>
        

  );
};
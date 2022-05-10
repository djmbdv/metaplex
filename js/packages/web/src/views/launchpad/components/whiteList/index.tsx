import React from 'react';
import { Row,Col ,Progress } from 'antd'


export const WhiteList = ()=>{
    return(
        <Row  className='wrap-whitelist'>
            <Col>
            <Progress strokeColor="#000" percent={10} />
            </Col>
        </Row>
    )
}
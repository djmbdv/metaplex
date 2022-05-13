import React from 'react';
import { Row,Col ,Progress } from 'antd'


export const WhiteList = ()=>{
    return(
        <Row  className='wrap-whitelist'>
            <Col span={24}>
            <Row > 
                <Col span={10} ><span className="type-sale">PUBLIC SALE</span></Col>
                <Col span={14}><p className='initial-sale'>START IN</p></Col>
            </Row>
            <Row>
                <Col span={20} offset={2}><Progress strokeColor="#8B442E" percent={10} /></Col>
            </Row>
            <Row>
                <Col span={4} ><p className='token'>MAX</p></Col>
                <Col span={4} ><p className='token'>TOKENS</p></Col>
            </Row>
            
            </Col>
        </Row>
    )
}
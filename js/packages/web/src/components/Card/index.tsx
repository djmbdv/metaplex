import React, { useMemo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row,Col } from 'antd';
import { CachedImageContent } from '../ArtContent';

interface Props {
  pubkey: string;
  posterUri: string;
  name: string;
  link:string;
  description:string;
  price?:string;
  items?:string;
}

export const CardComponent = ({
  pubkey,
  posterUri,
  name,
  link,
  description,
  price,
  items
}: Props): ReactElement => {

  const detailsPriceItem = ( price,item)=>{
    return(
      <>
      <Row justify="center" >
        <Col span={4} ><span className="card-launchpad-status">LIVE</span></Col>
      </Row>
      <Row justify="center">
        <Col span={12}><p className="itemsPrecioDetails">Items {item}</p></Col>
        <Col span={12}><p className="itemsPrecioDetails">Price {price}SOL</p></Col>
      </Row>
      </>
    )
  }
  console.log('item:',items);

  return (
    <Link to={link}>
      <Card hoverable={true} className="auction-render-card cardLaunchpadWrap" bordered={false}>
        <div className="card-launchpad-info">
          <div className="art-content-wrapper">
            {posterUri && (
              <CachedImageContent
                uri={posterUri}
                className="launchpad-image  no-events"
                preview={false}
              />
            )}
          </div>
          <div className="launchpad-name">{name}</div>
          <div>
            {items && detailsPriceItem(price,items)}
          </div>
        </div>
        <div className="card-bid-info"></div>
      </Card>
    </Link>
  );
};


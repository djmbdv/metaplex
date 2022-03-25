import React, { useMemo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { CachedImageContent } from '../../../../../../components/ArtContent';

interface Props {
  pubkey: string;
  posterUri: string;
  name: string;
  description:string;
}

const CardComponent = ({
  pubkey,
  posterUri,
  name,
  description
}: Props): ReactElement => {



  return (
    <Link to={`/pack/${pubkey}`}>
      <Card hoverable={true} className="auction-render-card sliderCard-wrap" bordered={false}>
        <div className="card-art-info">
         {/*  <div className="card-artist-info card-artist-info--pack">
                <MetaAvatar creators={[creator]} /> 
            <div className="card-artist-info__subtitle">
              <p>Pack</p>
            </div>
          </div> */}
          <div className="art-content-wrapper">
            {posterUri && (
              <CachedImageContent
                uri={posterUri}
                className="auction-image no-events"
                preview={false}
              />
            )}
          </div>
          <div className="art-name">{name}</div>
          <div className="art-auction-info">
            <span className="info-message">{name}</span>
            <p className="info-message__main">Nov 9, 2021</p>
          </div>
        </div>
        <div className="card-bid-info"></div>
      </Card>
    </Link>
  );
};

export default CardComponent;

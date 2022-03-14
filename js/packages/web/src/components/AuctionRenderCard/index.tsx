import React from 'react';
import { Card, CardProps } from 'antd';
import { ArtContent } from '../ArtContent';
import { AuctionView, useArt, useCreators, useCreadores } from '../../hooks';
import { AmountLabel } from '../AmountLabel';
import { MetaAvatar } from '../MetaAvatar';
import { AuctionCountdown } from '../AuctionNumbers';
import { Artist } from '../../types';
import { useAuctionStatus } from './hooks/useAuctionStatus';
import { useTokenList } from '../../contexts/tokenList';
import { useState, useEffect } from 'react';

export interface AuctionCard extends CardProps {
  auctionView: AuctionView;
}

export const AuctionRenderCard = (props: AuctionCard) => {
  const { auctionView } = props;
  const id = auctionView.thumbnail.metadata.pubkey;
  const art = useArt(id);
  const creators = useCreators();
  const [creatorsInfo,setCreatorsInfo ]= useState<Artist[] | undefined>(undefined)
  const { status, amount } = useAuctionStatus(auctionView);
  let arts: Artist[];

  useEffect(()=>{
    fetch("https://apinft.proit.studio/").then(async r=>{
      let its = (await r.json()).map(i => i as Artist)
      arts = its
    })
    setCreatorsInfo(arts)

  },[])

  const name = art?.title || ' ';

  const tokenInfo = useTokenList().mainnetTokens.filter(m=>m.address == auctionView.auction.info.tokenMint)[0]

  const  creators1 = creators.map(c =>  {
    return {
      address: c.address,
      name: c.name,
      about: "",
      image: "",
      background: "",
    } as Artist


  
  })
  const card = (
    <Card hoverable={true} className={`auction-render-card`} bordered={true}>
      <div className={'card-art-info'}>
        <div className={'card-artist-info'}>

      {creators &&  
         <MetaAvatar creators={ creatorsInfo  && creatorsInfo.length ? creatorsInfo.filter(function(n) {
            for(var i = 0; i < creators.length; i++) {
                    if(n.address == creators1[i].address) return true;
            }
            return false;
          })
          : [creators1[0]]}  />
      }
          <span className={'artist-name'}>
            {creators1[0]?.name ||
              creators1[0]?.address?.substr(0, 6) ||
              'Ir a subasta'}
          </span>
        </div>
        <div className={'art-content-wrapper'}>
          <ArtContent
            className="auction-image no-events"
            preview={true}
            pubkey={id}
            allowMeshRender={true}
          />
        </div>
        <div className={'art-name'}>{name}</div>
        {/*<div className={'art-auction-info'}>
          <span className={'info-message'}>ENDING IN</span>
          <AuctionCountdown auctionView={auctionView} labels={true} />
        </div>*/}
      </div>
      <div className="card-bid-info">
        <span className={'text-uppercase info-message'}>{status}</span>
        <AmountLabel
          containerStyle={{ flexDirection: 'row' }}
          title={status}
          amount={amount}
          iconSize={24}
          tokenInfo={tokenInfo}
        />
      </div>
    </Card>
  );

  return card;
};

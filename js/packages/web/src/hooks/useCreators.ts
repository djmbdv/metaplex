import { useMemo } from 'react';
import { useMeta } from '../contexts';
import { Artist } from '../types';
import { AuctionView } from './useAuctions';
import { useEffect, useState } from 'react';

export const useCreators = (auction?: AuctionView) => {
  const { whitelistedCreatorsByCreator } = useMeta();
  const [creators1, setCreators1] = useState<Artist[] | undefined>(undefined);
  const creators = useMemo(
    () =>
      [
        ...(
          [
            ...(auction?.items || []).flat().map(item => item?.metadata),
            auction?.participationItem?.metadata,
          ]
            .filter(item => item && item.info)
            .map(item => item?.info.data.creators || [])
            .flat() || []
        )
          .filter(creator => creator.verified)
          .reduce((agg, item) => {
            agg.add(item.address);
            return agg;
          }, new Set<string>())
          .values(),
      ].map((creator, index, arr) => {
        const knownCreator = whitelistedCreatorsByCreator[creator];

        return {
          address: creator,
          verified: true,
          share: (1 / arr.length) * 100,
          image: knownCreator?.info.image || '',
          link: knownCreator?.info.twitter || '',
        } as Artist;
      }),
    [auction, whitelistedCreatorsByCreator],
  );
  useEffect(() => {
    const promesas = creators.map(c => {
      return fetch(`https://apinft.proit.studio/solana/${c?.address}`)
        .then(res => res.json())
        .then(res => res as Artist)
        .catch(() => c);
    }, creators);
    Promise.all(promesas).then(res => {
      setCreators1(res);
    });
  }, [auction, creators]);
  return creators1 || creators;
};

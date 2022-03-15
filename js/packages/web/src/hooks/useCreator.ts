import { StringPublicKey, pubkeyToString } from '@oyster/common';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { useMeta } from '../contexts';
import { Artist } from '../types';
export const useCreator = (
  id?: StringPublicKey | string | PublicKey | null,
) => {
  const [key] = useState(pubkeyToString(id));
  const [creator, setCreator] = useState<Artist | undefined>(undefined);
  //fetch address to url to get image

  useEffect(() => {
    fetch(`https://apinft.proit.studio/solana/${key}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setCreator(res as Artist);
      });
  }, [key]);
  return creator;
};

export interface CreatorInfo {
  address: string | undefined;
  image: string | undefined;
  name: string | undefined;
  about: string | undefined;
  verified: boolean;
  background: string | undefined;
  link: string | undefined;
}

export const useCreadores = () => {
  console.log('useCreadores');
  const { whitelistedCreatorsByCreator } = useMeta();
  const [creadores, setCreadores] = useState<CreatorInfo[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function linkInfo() {
      try {
        setLoading(true);
        console.log('running link info');
        setCreadores(
          await Promise.all(
            Object.values(whitelistedCreatorsByCreator).map(async creator => {
              const response = await fetch(
                `https://apinft.proit.studio/solana/${creator.info.address}`,
              );
              const json = await response.json();
              return {
                address: creator.info.address,
                image: json.image,
                name: json.name,
                about: '',
                verified: true,
                background: json.background,
                link: json.link ?? '',
              };
            }),
          ),
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    linkInfo();
  }, []);

  return [creadores, loading];
};

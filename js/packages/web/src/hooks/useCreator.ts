import { StringPublicKey, pubkeyToString } from '@oyster/common';
import { useEffect,useState } from 'react';
import { useMeta } from '../contexts';
import { Artist } from '../types';

export const useCreator = (id?: StringPublicKey) => {
  const { whitelistedCreatorsByCreator } = useMeta();
  const key = pubkeyToString(id);
  const creator = Object.values(whitelistedCreatorsByCreator).find(
    creator => creator.info.address === key,
  );
  console.log("creator", creator);
  return creator;
};

export const useCreators = ()=> {
  const {whitelistedCreatorsByCreator} = useMeta();
  const creators = Object.values(whitelistedCreatorsByCreator).map(creator => {
    return {
      address: creator.info.address,
      image: creator.info.image,
      name: creator.info.name,
    };
  }
  );
  return creators;
};



export interface CreatorInfo {
  address: string|undefined;
  image: string|undefined;
  name: string|undefined;
  about: string|undefined;
  verified: boolean;
  background: string|undefined;
  link: string|undefined;
}


export const useCreadores = ()=> {

  console.log("useCreadores");
  const {whitelistedCreatorsByCreator} = useMeta();
  const [creadores,setCreadores] = useState<CreatorInfo[]>([])
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    async function linkInfo() {
      try {
        setLoading(true);    
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
              about: "",
              verified: true,
              background: json.background,
              link: json.link ?? "",
            };
          }
        )));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    linkInfo();

  });

  return [creadores,loading];
};

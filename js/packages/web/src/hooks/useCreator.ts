import { StringPublicKey, pubkeyToString } from '@oyster/common';
import { useMeta } from '../contexts';

export const useCreator = (id?: StringPublicKey) => {
  const { whitelistedCreatorsByCreator } = useMeta();
  const key = pubkeyToString(id);
  //fetch address to url to get image
  fetch(`https://apinft.proit.studio/address/${key}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });
  const creator = Object.values(whitelistedCreatorsByCreator).find(
    creator => creator.info.address === key,
  );
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

// Leave for store implementation
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getUser = async (): Promise<null> => {
  return null;
};

export const getWalletAddress = async () => {
  return 'wallet';
};

export const saveUser = async (
  email: string,
  wallet: string,
  callback: () => void,
) => {
  callback();
};

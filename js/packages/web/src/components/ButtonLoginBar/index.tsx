import React,{ useCallback} from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import{ UserOutlined } from '@ant-design/icons';
import { useWalletModal } from '@oyster/common';


export const ButtoLoginBar = () =>{
    const { wallet, connect, connected } = useWallet();
    const { setVisible } = useWalletModal();
    const open = useCallback(() => setVisible(true), [setVisible]);
  
    const handleClick = useCallback(
      () => (wallet ? connect().catch(() => {}) : open()),
      [wallet, connect, open],
    );
  
    return(
        <>
            <div className="wrap-btnWlogin">
                <a className="sell" >
                    sell
                </a>
                <a className="ico">
                <UserOutlined />
                </a>
                <a className="wallet" onClick={handleClick}>
                Select Wallet  
                </a>
            </div>
        </>
    )
}
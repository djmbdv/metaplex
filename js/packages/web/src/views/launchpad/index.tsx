import { Layout,Row,Col } from 'antd';
import React from 'react';
import { Button,Progress } from 'antd';
import { CachedImageContent } from '../../components/ArtContent';
import { Typography } from 'antd';
import { TabsInfo } from './components/tabs-info';
import { InfoLaunchpad } from "./info-launchpad";
import {useState, useCallback, useEffect,useMemo } from 'react';
import * as anchor from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  awaitTransactionSignatureConfirmation,
  CandyMachineAccount,
  CANDY_MACHINE_PROGRAM,
  getCandyMachineState,
  mintOneToken,
  getCollectionPDA,
  SetupState,
  createAccountsForMint,
} from '../../models/candy-machine';
import { sendTransaction }  from '../../models/connection';
import { WhiteList } from './components/whiteList'
import { PublicKey, Transaction } from '@solana/web3.js';
import {MintButton } from "./components/mintButton"
import { GatewayProvider } from '@civic/solana-gateway-react';
import { AlertState, toDate, getAtaForMint } from '../../models/utils';
import {ConnectButton,MetaplexOverlay} from "@oyster/common"
import {MintCountdown} from "./components/mintCountdown"
import {Confetti} from "../../components/Confetti"
import { SocialNetworking } from './components/socialmedia'


const { Title, Paragraph } = Typography;



/*const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!,
    );

    return candyMachineId;
  } catch (e) {
    console.log('Failed to construct CandyMachineId', e);
    return undefined;
  }
};*/
export interface LaunchpadViewProps {
    candyMachineId?: anchor.web3.PublicKey;
    connection: anchor.web3.Connection;
    txTimeout: number;
    rpcHost: string;
  }

const defaultProps : LaunchpadViewProps = {
   candyMachineId: new anchor.web3.PublicKey(
    "6CDkZfay8Q4S82e3bo2tYPBXGC5mLkHewuMYcedmCeWU"),
   rpcHost : "https://metaplex.devnet.rpcpool.com/",
   txTimeout : 40,
   connection:new anchor.web3.Connection(
    "https://metaplex.devnet.rpcpool.com/"
  )
  };

export const LaunchpadView = (props:LaunchpadViewProps) => {
    const [isUserMinting, setIsUserMinting] = useState(false);
    const [candyMachine, setCandyMachine] = useState<CandyMachineAccount|null>(null);
    const [alertState, setAlertState] = useState<AlertState>({
      open: false,
      message: '',
      severity: undefined,
    });
    const [showCongrats, setShowCongrats] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [endDate, setEndDate] = useState<Date>();
    const [itemsRemaining, setItemsRemaining] = useState<number>();
    const [isWhitelistUser, setIsWhitelistUser] = useState(false);
    const [isPresale, setIsPresale] = useState(false);
    const [discountPrice, setDiscountPrice] = useState<anchor.BN>();
    const [needTxnSplit, setNeedTxnSplit] = useState(true);
    const [setupTxn, setSetupTxn] = useState<SetupState>();
    
    const rpcUrl = props.rpcHost;
    const wallet = useWallet();
  
    const anchorWallet = useMemo(() => {
      if (
        !wallet ||
        !wallet.publicKey ||
        !wallet.signAllTransactions ||
        !wallet.signTransaction
      ) {
        return;
      }
  
      return {
        publicKey: wallet.publicKey,
        signAllTransactions: wallet.signAllTransactions,
        signTransaction: wallet.signTransaction,
      } as anchor.Wallet;
    }, [wallet]);
  
    const refreshCandyMachineState = useCallback(async () => {
      if (!anchorWallet) {
        return;
      }
  
      if (props.candyMachineId) {
        try {
          const cndy = await getCandyMachineState(
            anchorWallet,
            props.candyMachineId,
            props.connection,
          );
          let active =
            cndy?.state.goLiveDate?.toNumber() < new Date().getTime() / 1000;
          let presale = false;
          // whitelist mint?
          if (cndy?.state.whitelistMintSettings) {
            // is it a presale mint?
            if (
              cndy.state.whitelistMintSettings.presale &&
              (!cndy.state.goLiveDate ||
                cndy.state.goLiveDate.toNumber() > new Date().getTime() / 1000)
            ) {
              presale = true;
            }
            // is there a discount?
            if (cndy.state.whitelistMintSettings.discountPrice) {
              setDiscountPrice(cndy.state.whitelistMintSettings.discountPrice);
            } else {
              setDiscountPrice(undefined);
              // when presale=false and discountPrice=null, mint is restricted
              // to whitelist users only
              if (!cndy.state.whitelistMintSettings.presale) {
                cndy.state.isWhitelistOnly = true;
              }
            }
            // retrieves the whitelist token
            const mint = new anchor.web3.PublicKey(
              cndy.state.whitelistMintSettings.mint,
            );
            const token = (await getAtaForMint(mint, anchorWallet.publicKey))[0];
  
            try {
              const balance = await props.connection.getTokenAccountBalance(
                token,
              );
              const valid = parseInt(balance.value.amount) > 0;
              // only whitelist the user if the balance > 0
              setIsWhitelistUser(valid);
              active = (presale && valid) || active;
            } catch (e) {
              setIsWhitelistUser(false);
              // no whitelist user, no mint
              if (cndy.state.isWhitelistOnly) {
                active = false;
              }
              console.log('There was a problem fetching whitelist token balance');
              console.log(e);
            }
          }
          // datetime to stop the mint?
          if (cndy?.state.endSettings?.endSettingType.date) {
            setEndDate(toDate(cndy.state.endSettings.number));
            if (
              cndy.state.endSettings.number.toNumber() <
              new Date().getTime() / 1000
            ) {
              active = false;
            }
          }
          // amount to stop the mint?
          if (cndy?.state.endSettings?.endSettingType.amount) {
            const limit = Math.min(
              cndy.state.endSettings.number.toNumber(),
              cndy.state.itemsAvailable,
            );
            if (cndy.state.itemsRedeemed < limit) {
              setItemsRemaining(limit - cndy.state.itemsRedeemed);
            } else {
              setItemsRemaining(0);
              cndy.state.isSoldOut = true;
            }
          } else {
            setItemsRemaining(cndy.state.itemsRemaining);
          }
  
          if (cndy.state.isSoldOut) {
            active = false;
          }
  
          const [collectionPDA] = await getCollectionPDA(props.candyMachineId);
          const collectionPDAAccount =
            await cndy.program.provider.connection.getAccountInfo(collectionPDA);
  
          setIsActive((cndy.state.isActive = active));
          setIsPresale((cndy.state.isPresale = presale));
          setCandyMachine(cndy);
  
          const txnEstimate =
            892 +
            (!!collectionPDAAccount && cndy.state.retainAuthority ? 182 : 0) +
            (cndy.state.tokenMint ? 177 : 0) +
            (cndy.state.whitelistMintSettings ? 33 : 0) +
            (cndy.state.whitelistMintSettings?.mode?.burnEveryTime ? 145 : 0) +
            (cndy.state.gatekeeper ? 33 : 0) +
            (cndy.state.gatekeeper?.expireOnUse ? 66 : 0);
  
          setNeedTxnSplit(txnEstimate > 1230);
        } catch (e) {
          if (e instanceof Error) {
            if (e.message === `Account does not exist ${props.candyMachineId}`) {
              setAlertState({
                open: true,
                message: `Couldn't fetch candy machine state from candy machine with address: ${props.candyMachineId}, using rpc: ${props.rpcHost}! You probably typed the REACT_APP_CANDY_MACHINE_ID value in wrong in your .env file, or you are using the wrong RPC!`,
                severity: 'error',
                noHide: true,
              });
            } else if (e.message.startsWith('failed to get info about account')) {
              setAlertState({
                open: true,
                message: `Couldn't fetch candy machine state with rpc: ${props.rpcHost}! This probably means you have an issue with the REACT_APP_SOLANA_RPC_HOST value in your .env file, or you are not using a custom RPC!`,
                severity: 'error',
                noHide: true,
              });
            }
          } else {
            setAlertState({
              open: true,
              message: `${e}`,
              severity: 'error',
              noHide: true,
            });
          }
          console.log(e);
        }
      } else {
        setAlertState({
          open: true,
          message: `Your REACT_APP_CANDY_MACHINE_ID value in the .env file doesn't look right! Make sure you enter it in as plain base-58 address!`,
          severity: 'error',
          noHide: true,
        });
      }
    }, [anchorWallet, props.candyMachineId, props.connection, props.rpcHost]);
  
    const onMint = async (
      beforeTransactions: Transaction[] = [],
      afterTransactions: Transaction[] = [],
    ) => {
      try {
        setIsUserMinting(true);
        if (wallet.connected && candyMachine?.program && wallet.publicKey) {
          let setupMint: SetupState | undefined;
          if (needTxnSplit && setupTxn === undefined) {
            setAlertState({
              open: true,
              message: 'Please sign account setup transaction',
              severity: 'info',
            });
            setupMint = await createAccountsForMint(
              candyMachine,
              wallet.publicKey,
            );


            let status: any = { err: true };
            if (setupMint.transaction) {
              status = await awaitTransactionSignatureConfirmation(
                setupMint.transaction,
                props.txTimeout,
                props.connection,
                true,
              );
            }
            console.log("transaccion firmada")
            if (status && !status.err) {
              setSetupTxn(setupMint);
              setAlertState({
                open: true,
                message:
                  'Setup transaction succeeded! Please sign minting transaction',
                severity: 'info',
              });
            } else {
              setAlertState({
                open: true,
                message: 'Mint failed! Please try again!',
                severity: 'error',
              });
              setIsUserMinting(false);
              return;
            }
          } else {
            setAlertState({
              open: true,
              message: 'Please sign minting transaction',
              severity: 'info',
            });
          }
  
          const mintOne = await mintOneToken(
            candyMachine,
            wallet.publicKey,
            beforeTransactions,
            afterTransactions,
            setupMint ?? setupTxn,
          );
          const mintTxId = mintOne[0];
          console.log("test")
          let status: any = { err: true };
          if (mintTxId) {
            status = await awaitTransactionSignatureConfirmation(
              mintTxId,
              props.txTimeout,
              props.connection,
              true,
            );
            console.log("test")
          }
          console.log(JSON.stringify(status))
          if (status && !status.err) {
            const remaining = itemsRemaining! - 1;
            setItemsRemaining(remaining);
            setIsActive((candyMachine.state.isActive = remaining > 0));
            candyMachine.state.isSoldOut = remaining === 0;
            setSetupTxn(undefined);
            setAlertState({
              open: true,
              message: 'Congratulations! Mint succeeded!',
              severity: 'success',
            });
            alert("one Token")
          } else {
            console.log("error")
            setAlertState({
              open: true,
              message: 'Mint failed! Please try again!',
              severity: 'error',
            });
          }
        }
      } catch (error: any) {
        let message = error.msg || 'Minting failed! Please try again!';
        if (!error.msg) {
          if (!error.message) {
            message = 'Transaction timeout! Please try again.';
          } else if (error.message.indexOf('0x137')) {
            console.log(error);
            message = `SOLD OUT!`;
          } else if (error.message.indexOf('0x135')) {
            message = `Insufficient funds to mint. Please fund your wallet.`;
          }
        } else {
          if (error.code === 311) {
            console.log(error);
            message = `SOLD OUT!`;
            window.location.reload();
          } else if (error.code === 312) {
            message = `Minting period hasn't started yet.`;
          }
        }
  
        setAlertState({
          open: true,
          message,
          severity: 'error',
        });

        refreshCandyMachineState();
      } finally {
        setIsUserMinting(false);
      }
    };

    const toggleMintButton = () => {
      let active = !isActive || isPresale;
  
      if (active) {
        if (candyMachine!.state.isWhitelistOnly && !isWhitelistUser) {
          active = false;
        }
        if (endDate && Date.now() >= endDate.getTime()) {
          active = false;
        }
      }
  
      if (
        isPresale &&
        candyMachine!.state.goLiveDate &&
        candyMachine!.state.goLiveDate.toNumber() <= new Date().getTime() / 1000
      ) {
        setIsPresale((candyMachine!.state.isPresale = false));
      }
  
      setIsActive((candyMachine!.state.isActive = active));
    };
  
    useEffect(() => {
      console.log("refreshCandyMachineState")
      refreshCandyMachineState();
    }, [
      anchorWallet,
      props.candyMachineId,
      props.connection,
      refreshCandyMachineState,showCongrats
    ]);
  return (
    <Layout style={{ margin: 0, marginTop: 30 }}>
    <MetaplexOverlay visible={showCongrats}>
            <Confetti />
            <h1
              className="title"
              style={{
                fontSize: '3rem',
                marginBottom: 20,
              }}
            >
              Congratulations
            </h1>
            <p
              style={{
                
                textAlign: 'center',
                fontSize: '2rem',
              }}
            >
              Your NTF has minted 
            </p>
            <Button
              className="overlay-btn"
              onClick ={ ()=>setShowCongrats(false)}
            >
              OK
            </Button>
          </MetaplexOverlay>
    <Row className='details-launchpad'  gutter={{ xs: 24, sm: 16, md: 24, lg: 32 }} >
   <Col md={{span:12,order:1}} xs={{span:24,order:2}} className="gutter-row datos-launchpad" >
       <Row><Col><Button className="btn-outline-launchpad" size="small">FEATURED LAUNCH</Button></Col></Row>
       <Row><Col><Title>Louis XV</Title></Col></Row>
       <Row className='wrap-total-social'>
           <Col><Button className="btn-outline-launchpad">VERIFIED</Button></Col>
           <Col><Button className="btn-outline-launchpad">ESCROW 15D</Button></Col>
           <Col>
           <Row className="wrap-total-social">
              <Col><p id="total-items-launchpad" >TOTAL ITEMS  1000 </p></Col>
              <Col><SocialNetworking img="/twitter.svg" url="/"  /></Col>
              <Col><SocialNetworking img="/discord.svg" url="/"  /></Col>
              <Col><SocialNetworking img="/instagram.svg" url="/"  /></Col>
              <Col><SocialNetworking img="/web.svg" url="/"  /></Col>
            </Row>
           </Col>
       </Row>
       <Row><Col span={20}>
           <Paragraph className='details-paragraph'> 
           Louis XV 1996 received a Gold medal at The World’s Finest Glass of Bubbly awards in 2017. 
           Subtle and voluptuous, revealing a paradox of flavors, fine but intense, 
           underlined by an incandescent yellow gold color. This Champagne's exceptional elegance will seduce connoisseurs 
           of great champagnes.
          75 cl   
           </Paragraph>
            {isActive && endDate && Date.now() < endDate.getTime() ? (
                      <>
                        <MintCountdown
                          key="endSettings"
                          date={getCountdownDate(candyMachine)}
                          style={{ justifyContent: 'flex-end' }}
                          status="COMPLETED"
                          onComplete={toggleMintButton}
                          price={Number(candyMachine?.state.price)/1000000000}
                        />
                        <Typography
                          style={{ fontWeight: 'bold' }}
                        >
                          TO END OF MINT
                        </Typography>
                      </>
                    ) : (
                      <>
                        <MintCountdown
                          key="goLive"
                          date={getCountdownDate(candyMachine)}
                          price={Number(candyMachine?.state.price)/1000000000}
                          status={
                            candyMachine?.state?.isSoldOut ||
                            (endDate && Date.now() > endDate.getTime())
                              ? 'COMPLETED'
                              : isPresale
                              ? 'PRESALE'
                              : 'LIVE'
                          }
                          onComplete={toggleMintButton}
                        />
                        {isPresale && candyMachine &&
                          candyMachine.state.goLiveDate &&
                          candyMachine.state.goLiveDate.toNumber() >
                            new Date().getTime() / 1000 && (
                            <Typography
                              style={{ fontWeight: 'bold' }}
                            >
                              UNTIL PUBLIC MINT
                            </Typography>
                          )}
                      </>
                    )}

        </Col></Row>
        <WhiteList />
   </Col>
   <Col md={{span:12,order:2}} xs={{span:24,order:1}}  className="gutter-row">
       <Row><Col span={24}  className="wrap-btnCandy">
           <CachedImageContent
           uri="https://wincbphavq4xu2b5ug5zdyui4glhbeeoeygnur4uynygfpou.arweave.net/sho_gvOCsOXp-oPaG7keKI4ZZwkI4mDNp_HlMNwYr3U?ext=gif"
           className="auction-image no-events"
           preview={true}
            />
           </Col></Row>
       <Row className="wrap-btnCandy-p"> <Col  span={12} >
        {!wallet.connected ? (
            <ConnectButton className=" btn-mint" >Connect Wallet</ConnectButton>
          ) :(
          candyMachine?.state.isActive &&
                candyMachine?.state.gatekeeper &&
                wallet.publicKey &&
                wallet.signTransaction ? (
                  <GatewayProvider
                    wallet={{
                      publicKey:
                        wallet.publicKey ||
                        new PublicKey(CANDY_MACHINE_PROGRAM),
                      //@ts-ignore
                      signTransaction: wallet.signTransaction,
                    }}
                    gatekeeperNetwork={
                      candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                    }
                    clusterUrl={rpcUrl}
                    handleTransaction={async (transaction: Transaction) => {
                      setIsUserMinting(true);
                      const userMustSign = transaction.signatures.find(sig =>
                        sig.publicKey.equals(wallet.publicKey!),
                      );
                      if (userMustSign) {
                        setAlertState({
                          open: true,
                          message: 'Please sign one-time Civic Pass issuance',
                          severity: 'info',
                        });
                        try {
                          transaction = await wallet.signTransaction!(
                            transaction,
                          );
                        } catch (e) {
                          setAlertState({
                            open: true,
                            message: 'User cancelled signing',
                            severity: 'error',
                          });
                          setIsUserMinting(false);
                          throw e;
                        }
                      } else {
                        setAlertState({
                          open: true,
                          message: 'Refreshing Civic Pass',
                          severity: 'info',
                        });
                      }
                      try {
                        await sendTransaction(
                          props.connection,
                          wallet,
                          transaction,
                          [],
                          true,
                          'confirmed',
                        );
                        setAlertState({
                          open: true,
                          message: 'Please sign minting',
                          severity: 'info',
                        });
                      } catch (e) {
                        setAlertState({
                          open: true,
                          message:
                            'Solana dropped the transaction, please try again',
                          severity: 'warning',
                        });
                        console.error(e);
                        // setTimeout(() => window.location.reload(), 2000);
                        setIsUserMinting(false);
                        throw e;
                      }
                      await onMint();
                    }}
                    broadcastTransaction={false}
                    options={{ autoShowModal: false }}
                  >
                    <MintButton
                      candyMachine={candyMachine}
                      isMinting={isUserMinting}
                      setIsMinting={val => setIsUserMinting(val)}
                      onMint={onMint}
                      isActive={isActive || (isPresale && isWhitelistUser)}
                      onMinted = {()=> setShowCongrats(true)}
                    />
                  </GatewayProvider>
                ) : (
                  <MintButton
                    candyMachine={candyMachine}
                    isMinting={isUserMinting}
                    setIsMinting={val => setIsUserMinting(val)}
                    onMint={onMint}
                    onMinted = {()=> setShowCongrats(true)}
                    isActive={isActive || (isPresale && isWhitelistUser)}
                  />
                ))}

          
         </Col>
          <Col  span={12}>
            <Row >
              {candyMachine?.state  &&  <Progress strokeColor="#8B442E" percent={Math.floor((candyMachine.state.itemsRedeemed/(candyMachine?.state.endSettings?.number?
                Math.min(
              candyMachine?.state.endSettings?.number.toNumber(),
              candyMachine?.state.itemsAvailable
            ) :  candyMachine?.state.itemsAvailable))*100)} />}
          </Row>
                      <Row >
                        TOTAL MINTED {candyMachine?.state?.itemsRedeemed}
          </Row>
         </Col>
         </Row>

   </Col>
</Row>
<Row className="section-info" gutter={{ xs: 24, sm: 16, md: 24, lg: 32}}>
   <Col md={12} xs={24} className="gutter-row" >
       <Row >
           <Col span={20} >
            <InfoLaunchpad />
           </Col>
       </Row>
   </Col>
   <Col md={12} xs={24} className="gutter-row" >
       <Row justify="center">
           <Col span={20} >
               <TabsInfo />
           </Col>
       </Row>
   </Col>
</Row>
</Layout>

  );
};


const getCountdownDate = (
  candyMachine: CandyMachineAccount|null,
): Date | undefined => {
  if (
    candyMachine?.state.isActive &&
    candyMachine?.state.endSettings?.endSettingType.date
  ) {
    return toDate(candyMachine?.state.endSettings.number);
  }

  return toDate(
    candyMachine?.state.goLiveDate
      ? candyMachine?.state.goLiveDate
      : candyMachine?.state.isPresale
      ? new anchor.BN(new Date().getTime() / 1000)
      : undefined,
  );
};

LaunchpadView.defaultProps = defaultProps
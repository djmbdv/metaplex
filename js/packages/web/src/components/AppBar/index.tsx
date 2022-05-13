import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Modal, Row, Col } from 'antd';
import { useWallet } from '@solana/wallet-adapter-react';
import { ButtoLoginBar } from '../ButtonLoginBar';
import { Notifications } from '../Notifications';
import useWindowDimensions from '../../utils/layout';
import { MenuOutlined } from '@ant-design/icons';
import { HowToBuyModal } from '../HowToBuyModal';
import {
  Cog,
  CurrentUserBadge,
  CurrentUserBadgeMobile,
} from '../CurrentUserBadge';
import { ConnectButton } from '@oyster/common';


const getDefaultLinkActions = (connected: boolean) => {
  return [
    <Link to={`/`} key={'explore'}>
      <Button className="app-btn">Home</Button>
    </Link>,
    <Link to={`/artworks`} key={'collections'}>
      <Button className="app-btn">{connected ? 'My Collecions' : 'Collections'}</Button>
    </Link>,
    <Link to={`/launchpads`} key={'Launchpads'}>
    <Button className="app-btn">Launchpad</Button>
  </Link>,
    <Link to={`/`} key={'Auctions'}>
    <Button className="app-btn">Auctions</Button>
  </Link>,
    <Link to={`/`} key={'stats'}>
    <Button className="app-btn">Stats</Button>
  </Link>,
  ];
};

const DefaultActions = ({ vertical = false }: { vertical?: boolean }) => {
  const { connected } = useWallet();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
      }}
    >
      {getDefaultLinkActions(connected)}
    </div>
  );
};

const MetaplexMenu = () => {
  const { width } = useWindowDimensions();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { connected } = useWallet();

  if (width < 768)
    return (
      <>
        <Modal
          //title={<img src={'/metaplex-logo.svg'} />}
          title={<img src={'/metaplex-logo-blnco.svg'} className="logo" />}
          visible={isModalVisible}
          footer={null}
          className={'modal-box'}
          closeIcon={
            <img
              onClick={() => setIsModalVisible(false)}
              src={'/modals/close.svg'}
            />
          }
        >
          <div className="site-card-wrapper mobile-menu-modal">
            <Menu onClick={() => setIsModalVisible(false)}>
              {getDefaultLinkActions(connected).map((item, idx) => (
                <Menu.Item key={idx}>{item}</Menu.Item>
              ))}
            </Menu>
            <div className="actions">
              {!connected ? (
                <div className="actions-buttons">
                  <ConnectButton
                    onClick={() => setIsModalVisible(false)}
                    className="secondary-btn"
                  />
                  <HowToBuyModal
                    onClick={() => setIsModalVisible(false)}
                    buttonClassName="black-btn"
                  />
                </div>
              ) : (
                <>
                  <CurrentUserBadgeMobile
                    showBalance={false}
                    showAddress={true}
                    iconSize={24}
                    closeModal={() => {
                      setIsModalVisible(false);
                    }}
                  />
                  <Notifications />
                  <Cog />
                </>
              )}
            </div>
          </div>
        </Modal>
        {/* button burgue menu Mobile. */}
        <MenuOutlined
          onClick={() => setIsModalVisible(true)}
          style={{ fontSize: '1.4rem',color:'#8B442E' }}
        />
      </>
    );

  return <DefaultActions />;
};

export const LogoLink = () => {
  return (
    <Link to={`/`}>
      <img src={'/metaplex-logo.svg'} className="logo" />
    </Link>
  );
};




export const AppBar = () => {
  const { connected } = useWallet();
  return (
    <>
      <div id="mobile-navbar">
      <MetaplexMenu />
        <LogoLink />
        {/* <MetaplexMenu /> */}
      </div>
      <div id="desktop-navbar">
        <div className="app-left">
          <LogoLink />
          {/* &nbsp;&nbsp;&nbsp;
          <MetaplexMenu /> */}
        </div>
        <div className="app-right">
        {/*   {!connected && (
            <HowToBuyModal buttonClassName="modal-button-default" />
          )} */}
          {!connected && (
            <ButtoLoginBar />
            //<ConnectButton style={{ height: 48 }} allowWalletChange />
          )}
          {connected && (
            <>
              <CurrentUserBadge
                showBalance={false}
                showAddress={true}
                iconSize={24}
              />
              <Notifications />
              <Cog />
            </>
          )}
        </div>
        
      </div>
      <Row  className='wrap-second-bar' justify='center' >
          <Col md={24} xs={2}>
        <div className="app-center">
          <MetaplexMenu />
        </div>
        </Col>
      </Row>
      
    </>
  );
};

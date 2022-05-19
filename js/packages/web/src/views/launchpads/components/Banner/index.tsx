import React from 'react';
import { useEffect } from 'react';
import {GoToLaunchpad} from '../BtnGotoLaunchpad';

export const Banner = (props: {
  src: string;
  useBannerBg: boolean;
  headingText: string;
  subHeadingText: string;
  actionComponent?: JSX.Element;
  children?: React.ReactNode;
}) => {

  return (
    <>
      <div id="mobile-banner">
        <img className="banner-img" src={props.src} />
        <div className="banner-content">
          <div id={'main-heading'}>{props.headingText}</div>
          <div id={'sub-heading'}>{props.subHeadingText}</div>
          {props.actionComponent}
        </div>
      </div>
      {/* <div
        id={'current-banner'}
        style={{ backgroundImage: `url(${props.src})` }}
      > */}
      <div
        id={'current-banner'}
        
      >
        <span ></span>
        <div id="banner-inner">
          <div id={'message-container'}>

            <div id={'main-heading'}><GoToLaunchpad buttonText='FEATURED LAUNCHPAD' buttonClassName='banner-outline-btn' /></div>
            <div id={'main-heading'}>{props.headingText}</div>
            <div id={'sub-heading'}>{props.subHeadingText}</div>
            {props.actionComponent}
          </div>
          {/* {props.children} */}
          {/* <div className="powered-by">
            <span>
              POWERED BY <b>Corko.io</b>
            </span>
          </div> */}
          <div  className='imgBanner' >
             <img className="imgDesktop" src={props.src} />
          </div>
        </div>
      </div>
    </>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';

export const SocialNetworking = (props) => {
    const {url, img,className } = props
    return (
      <Link to={`${url}`}>
        <img src={`${img}`} className={`${className}`} />
      </Link>
    );
  };
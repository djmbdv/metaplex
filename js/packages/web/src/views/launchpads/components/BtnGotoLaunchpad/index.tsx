import React from 'react';
import { Button } from 'antd';

interface GoToLaunchpadProps {
  buttonClassName: string;
  onClick?: any;
  buttonText: string;
}

export const GoToLaunchpad: React.FC<GoToLaunchpadProps> = ({
  buttonClassName,
  onClick,
  buttonText,
}) => {
  return (
    <Button className={buttonClassName} onClick={onClick}>
      {buttonText}
    </Button>
  );
};

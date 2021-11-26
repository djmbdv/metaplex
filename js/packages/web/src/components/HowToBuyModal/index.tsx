import { InstructionsModal } from '../InstructionsModal';
import React from 'react';
import { LABELS } from '../../constants';
import { ConnectButton } from '@oyster/common';

interface HowToBuyModalProps {
  buttonClassName: string;
  onClick?: any;
}

export const HowToBuyModal: React.FC<HowToBuyModalProps> = ({
  buttonClassName,
  onClick,
}) => {
  return (
    <InstructionsModal
      buttonClassName={buttonClassName}
      buttonText="¿Como comprar?"
      modalTitle={`Buying NFTs on ${LABELS.STORE_NAME}`}
      cardProps={[
        {
          title: 'Crea tu billetera de Solana (SOL)',
          imgSrc: '/modals/how-to-buy-1.svg',
          description: `SOL es la cryptomoneda que usamos para comprar en ${LABELS.STORE_NAME}. Para mantener tus SOL seguros, necesitamos una billetra de cryptomendas nosotros recomendamos Phantom. solo debes descargar  la extension de Chrome y crear una cuenta.`,
        },
        {
          title: 'Deposita fondos en tu Billetera',
          imgSrc: '/modals/how-to-buy-2.svg',
          description: `Para depositar fondos en tu billetera lo unico que necesitas es adquirir SOL. la forma mas facil es con tarjeta de credito por medio de FTX Pay un servicio que ya es parte de tu nueva billetera Phantom. Abre tu Billetera y selecciona "Depositar SOL", y selecciona "Depositar desde FTX". una nueva ventana se abrira donde podras crearte una cuenta en FTX y comprar SOL.`,
        },
        {
          title: `Conecta tu billetera a ${LABELS.STORE_NAME}.`,
          imgSrc: '/modals/how-to-buy-3.jpg',
          description: `Para conectar tu billetera, pulsa "Conectar Billetera" en nuestro sistio. Selecciona la opcion Phantom y tu billetera se conectara. Despues de eso ya puedes empezar a ofertar por NFTs.`,
          endElement: <ConnectButton className={'secondary-btn'} />,
        },
      ]}
      onClick={onClick}
    />
  );
};

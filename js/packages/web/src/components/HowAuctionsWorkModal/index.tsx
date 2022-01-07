import { InstructionsModal } from '../InstructionsModal';
import React from 'react';
import { LABELS } from '../../constants';

interface HowAuctionsWorkModalProps {
  buttonClassName: string;
}

export const HowAuctionsWorkModal: React.FC<HowAuctionsWorkModalProps> = ({
  buttonClassName,
}) => {
  return (
    <InstructionsModal
      buttonClassName={buttonClassName}
      buttonText="Como funiconan las Subastas"
      modalTitle="Como funiconan las Subastas"
      cardProps={[
        {
          title: 'Haz una oferta',
          description: `Una vez que encuentres que te gustaria poseer, haz una oferta en la pagina de subasta. ten en cuenta que la cantidad de SOL ofrecida se mantendra bloqueada en tu billetera hasta que finalice la subasta`,
          imgSrc: '/modals/how-auctions-work-1.jpg',
        },
        {
          title: 'Gana la subasta',
          description: `Mantente alerta en la pagina de subasta (y en tus notificaciones) para saber si tu oferta a sido superada, y como la venta esta progresando.`,
          imgSrc: '/modals/how-auctions-work-2.jpg',
        },
        {
          title: 'Redime tu NFT',
          description: `Si eres lo suficiente mente afortunado para ganar la subasta por tu NFT, debes redimirlo y agregarlo a tu wallet. esto puede ser realizado desde la pagina de subasta, la notificacion de ganar, o en tu perfil en ${LABELS.STORE_NAME}.`,
          imgSrc: '/modals/how-auctions-work-3.jpg',
        },
      ]}
    />
  );
};

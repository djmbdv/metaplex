import Countdown from 'react-countdown';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Col, Row } from 'antd';

interface MintCountdownProps {
  date: Date | undefined;
  style?: React.CSSProperties;
  status?: string;
  onComplete?: () => void;
  price?: number;
}

interface MintCountdownRender {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export const MintCountdown: React.FC<MintCountdownProps> = ({
  date,
  status,
  style,
  onComplete,
  price,
}) => {
  const renderCountdown = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: MintCountdownRender) => {
    hours += days * 24;
    if (completed) {
      return status ? (
        <div className="wrap-btnCandy">
          <span className="textStatus">{status}</span>
        </div>
      ) : null;
    } else {
      return (
        <div className="wrap-btnCandy">
          <Row>
            <Col className="text-left" span={12}>
              <b className="text-tag">PUBLIC SALE</b>
            </Col>
            <Col className="text-right" span={12}>
              <b>
                START IN {hours < 10 ? `0${hours}` : hours}:
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </b>
            </Col>
          </Row>
          <div className="text-left price-line">
            <b>MAX 1 TOKEN = {`${price}`} SOL</b>
          </div>
        </div>
      );
    }
  };
  console.log(price);
  if (date) {
    return (
      <Countdown
        date={date}
        onComplete={onComplete}
        renderer={renderCountdown}
      />
    );
  } else {
    return null;
  }
};

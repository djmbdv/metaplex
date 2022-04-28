import { Paper } from '@material-ui/core';
import Countdown from 'react-countdown';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';


interface MintCountdownProps {
  date: Date | undefined;
  style?: React.CSSProperties;
  status?: string;
  onComplete?: () => void;
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
      return status ? <div className="wrap-btnCandy" ><span  className="textStatus">{status}</span></div> : null;
    } else {
      return (
        <div className="wrap-btnCandy" >
          <Paper elevation={0}>
            
              {hours < 10 ? `0${hours}` : hours}
            
            <span>hrs</span>
          </Paper>
          <Paper elevation={0}>
        
              {minutes < 10 ? `0${minutes}` : minutes}
         
            <span>mins</span>
          </Paper>
          <Paper elevation={0}>
         
              {seconds < 10 ? `0${seconds}` : seconds}
          
            <span>secs</span>
          </Paper>
        </div>
      );
    }
  };

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

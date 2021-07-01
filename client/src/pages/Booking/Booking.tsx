import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import BookingCard from '../../components/BookingCard/BookingCard';

import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { updateBookingsAccept, deleteBooking } from '../../helpers/APICalls/request';
import moment from 'moment';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Request } from '../../interface/Request';

interface Props {
  apiCall: () => Promise<Request>;
  isDogStitter: boolean;
}

interface ExtRequest extends Request {
  dates: any;
}
interface RequestObj {
  [key: string]: ExtRequest;
}
interface PickerDates {
  [index: number]: (Date | { after: Date; before: Date })[] | [];
}
export default function Sitters({ apiCall, isDogStitter }: Props): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<string | false>(false);

  const [nextBooking, setNextBooking] = useState<RequestObj>();
  const [currBooking, setCurrBooking] = useState<RequestObj>();
  const [pastBooking, setPastBooking] = useState<RequestObj>();
  const [dates, setDates] = useState<(Date | { after: Date; before: Date })[]>([]);
  const [pastDates, setpastDates] = useState<(Date | { after: Date; before: Date })[]>([]);
  useEffect(() => {
    apiCall().then((res: any) => {
      let request = res.requests;
      const next: RequestObj = {};
      const past: RequestObj = {};
      const curr: RequestObj = {};
      const oldDates: (Date | { after: Date; before: Date })[] = [];
      const now = moment().subtract(5, 'days').toISOString();

      request = request.map((req: ExtRequest) => {
        req.profile.fullName = `${req.profile.firstName} ${req.profile.lastName}`;
        req.dates = [
          new Date(req.startDate),
          { after: new Date(req.startDate), before: new Date(req.endDate) },
          new Date(req.endDate),
        ];
        return req;
      });

      request.forEach((req: ExtRequest) => {
        if (moment(now).isAfter(req.endDate)) {
          past[req._id] = req;
          if (isDogStitter) {
            if (req.accept) {
              oldDates.push(...req.dates);
            }
          } else {
            oldDates.push(...req.dates);
          }
        } else {
          if (Object.keys(next).length === 0) next[req._id] = req;
          else curr[req._id] = req;
        }
      });
      setNextBooking(next);
      setCurrBooking(curr);
      setPastBooking(past);
      setpastDates(oldDates);
    });
  }, [apiCall, isDogStitter]);

  useEffect(() => {
    const dates: any = [];
    const request: ExtRequest[] = [];
    if (nextBooking) request.push(...Object.values(nextBooking));
    if (currBooking) request.push(...Object.values(currBooking));
    request.forEach((req: ExtRequest) => {
      if (isDogStitter) {
        if (req.accept) {
          dates.push(...req.dates);
        }
      } else {
        dates.push(...req.dates);
      }
    });
    pastDates && dates.push(...pastDates);

    setDates(dates);
  }, [nextBooking, currBooking, isDogStitter, pastDates]);

  const handleChange = (panel: string) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAccept = (setState: React.Dispatch<(state: RequestObj) => RequestObj>, id: string) => {
    updateBookingsAccept(id, true, false).then(() => {
      setState((prevState: RequestObj) => ({ ...prevState, [id]: { ...prevState[id], accept: true, decline: false } }));
    });
  };

  const handleDecline = (setState: React.Dispatch<(state: RequestObj) => RequestObj>, id: string) => {
    updateBookingsAccept(id, false, true).then(() => {
      setState((prevState: RequestObj) => ({ ...prevState, [id]: { ...prevState[id], accept: false, decline: true } }));
    });
  };

  const handleCancelBooking = (setState: React.Dispatch<(state: RequestObj) => RequestObj>, id: string) => {
    deleteBooking(id).then(() => {
      setState((prevState: RequestObj) => {
        const { [id]: value, ...newState } = prevState;
        return newState;
      });
    });
  };

  return (
    <Grid container component="main" className={`${classes.root}`}>
      <CssBaseline />

      <Grid container spacing={5} className={classes.innerContainer}>
        <Grid item className={classes.innerContainerItem}>
          {nextBooking && Object.keys(nextBooking).length > 0 && (
            <Card className={classes.cardTop}>
              {Object.values(nextBooking).map((request: ExtRequest) => (
                <BookingCard
                  key={request._id}
                  booking={request}
                  handleAccept={handleAccept}
                  handleDecline={handleDecline}
                  setState={setNextBooking}
                  showActions={true}
                  text="YOUR NEXT BOOKING:"
                  isDogStitter={isDogStitter}
                  handleCancelBooking={handleCancelBooking}
                />
              ))}
            </Card>
          )}
          <Card className={classes.cardBottom}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography className={classes.sectionTitle}>CURRENT BOOKINGS: </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {currBooking && Object.keys(currBooking).length > 0 && (
                  <Grid container direction="column">
                    {Object.values(currBooking).map((request: ExtRequest) => (
                      <Card variant="outlined" key={request._id} className={classes.card}>
                        <BookingCard
                          key={request._id}
                          booking={request}
                          handleAccept={handleAccept}
                          handleDecline={handleDecline}
                          setState={setCurrBooking}
                          showActions={true}
                          isDogStitter={isDogStitter}
                          handleCancelBooking={handleCancelBooking}
                        />
                      </Card>
                    ))}
                  </Grid>
                )}
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                <Typography className={classes.sectionTitle}>PAST BOOKINGS:</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {pastBooking && Object.keys(pastBooking).length > 0 && (
                  <Grid container direction="column">
                    {Object.values(pastBooking).map((request: ExtRequest) => (
                      <Card variant="outlined" key={request._id} className={classes.card}>
                        <BookingCard
                          key={request._id}
                          booking={request}
                          setState={setPastBooking}
                          showActions={false}
                          isDogStitter={isDogStitter}
                        />
                      </Card>
                    ))}
                  </Grid>
                )}
              </AccordionDetails>
            </Accordion>
          </Card>
        </Grid>
        <Grid item className={classes.innerContainerItem}>
          <Card className={classes.cardCalander}>
            <DayPicker className={classes.dayPicker} selectedDays={dates} />
          </Card>
        </Grid>
      </Grid>
    </Grid> //main
  );
}

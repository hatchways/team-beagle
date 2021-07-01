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
import { updateAccept } from '../../helpers/APICalls/request';
import moment from 'moment';

import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Request } from '../../interface/Request';
interface Props {
  apiCall: any;
  isDogStitter: boolean;
}
export default function Sitters({ apiCall, isDogStitter }: Props): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<string | false>(false);

  const [nextBooking, setNextBooking] = useState<any>();
  const [currBooking, setCurrBooking] = useState<any>();
  const [pastBooking, setPastBooking] = useState<any>();
  const [dates, setDates] = useState<any>([]);

  useEffect(() => {
    apiCall().then((res: any) => {
      const request = res.requests;
      const next: any = {};
      const past: any = {};
      const curr: any = {};
      const dates: any = [];
      const now = moment().toISOString();

      request.forEach((req: Request) => {
        if (moment(now).isAfter(req.endDate)) past[req._id] = req;
        else {
          if (Object.keys(next).length === 0) next[req._id] = req;
          else curr[req._id] = req;
        }
        if (isDogStitter) {
          if (req.accept) {
            dates.push(new Date(req.startDate));
            dates.push({ after: new Date(req.startDate), before: new Date(req.endDate) });
            dates.push(new Date(req.endDate));
          }
        } else {
          dates.push(new Date(req.startDate));
          dates.push({ after: new Date(req.startDate), before: new Date(req.endDate) });
          dates.push(new Date(req.endDate));
        }
      });
      setNextBooking(next);
      setCurrBooking(curr);
      setPastBooking(past);
      setDates(dates);
    });
  }, [apiCall, isDogStitter]);

  useEffect(() => {
    const dates: any[] = [];
    const request: any[] = [];
    if (nextBooking) request.push(...Object.values(nextBooking));
    if (currBooking) request.push(...Object.values(currBooking));
    if (pastBooking) request.push(...Object.values(pastBooking));
    request.forEach((req: Request) => {
      if (isDogStitter) {
        if (req.accept) {
          dates.push(new Date(req.startDate));
          dates.push({ after: new Date(req.startDate), before: new Date(req.endDate) });
          dates.push(new Date(req.endDate));
        }
      } else {
        dates.push(new Date(req.startDate));
        dates.push({ after: new Date(req.startDate), before: new Date(req.endDate) });
        dates.push(new Date(req.endDate));
      }
    });
    setDates(dates);
  }, [nextBooking, currBooking, pastBooking, isDogStitter]);

  const handleChange = (panel: string) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAccept = (setState: React.Dispatch<any>, id: string) => {
    updateAccept(id, true, false).then(() => {
      setState((prevState: any) => ({ ...prevState, [id]: { ...prevState[id], accept: true, decline: false } }));
    });
  };

  const handleDecline = (setState: React.Dispatch<any>, id: string) => {
    updateAccept(id, false, true).then(() => {
      setState((prevState: any) => ({ ...prevState, [id]: { ...prevState[id], accept: false, decline: true } }));
    });
  };

  const handleCancelBooking = (setState: React.Dispatch<any>, id: string) => {
    setState((prevState: any) => {
      const { [id]: value, ...newState } = prevState;
      return newState;
    });

    // updateAccept(id, false, true).then(() => {
    //   setState((prevState: any) => ({ ...prevState, [id]: undefined }));
    // });
  };

  return (
    <Grid container component="main" className={`${classes.root}`}>
      <CssBaseline />

      <Grid container spacing={5} className={classes.innerContainer}>
        <Grid item className={classes.innerContainerItem}>
          {nextBooking && Object.keys(nextBooking).length > 0 && (
            <Card className={classes.cardTop}>
              {Object.values(nextBooking).map((request: any) => (
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
            {currBooking && Object.keys(currBooking).length > 0 && (
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                  <Typography className={classes.sectionTitle}>CURRENT BOOKINGS: </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="column">
                    {Object.values(currBooking).map((request: any) => (
                      <Card variant="outlined" key={request._id} className={classes.card}>
                        <BookingCard
                          key={request._id}
                          booking={request}
                          handleAccept={handleAccept}
                          handleDecline={handleDecline}
                          setState={setCurrBooking}
                          showActions={true}
                          text=""
                          isDogStitter={isDogStitter}
                          handleCancelBooking={handleCancelBooking}
                        />
                      </Card>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )}
            {pastBooking && Object.keys(pastBooking).length > 0 && (
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                  <Typography className={classes.sectionTitle}>PAST BOOKINGS:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="column">
                    {Object.values(pastBooking).map((request: any) => (
                      <Card variant="outlined" key={request._id} className={classes.card}>
                        <BookingCard
                          key={request._id}
                          booking={request}
                          handleAccept={handleAccept}
                          handleDecline={handleDecline}
                          setState={setPastBooking}
                          showActions={false}
                          text=""
                          isDogStitter={isDogStitter}
                          handleCancelBooking={handleCancelBooking}
                        />
                      </Card>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )}
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
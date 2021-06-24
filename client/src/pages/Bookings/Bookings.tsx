import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyle';
import BookingCard from '../../components/BookingCard/BookingCard';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import { getBookings, updateAccept } from '../../helpers/APICalls/request';
import moment from 'moment';

import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { Request } from '../../interface/Request';

export default function Bookings(): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<string | false>(false);

  const [nextBooking, setNextBooking] = useState<any>();
  const [currBooking, setCurrBooking] = useState<any>();
  const [pastBooking, setPastBooking] = useState<any>();
  const [dates, setDates] = useState<Date[]>([]);
  const test = 'he';
  useEffect(() => {
    getBookings().then((res: any) => {
      const request = res.requests;
      const next: any = {};
      const past: any = {};
      const curr: any = {};
      const dates: Date[] = [];
      const now = moment().toISOString();

      request.forEach((req: Request) => {
        if (moment(now).isAfter(req.endDate))
          if (Object.keys(next).length === 0) next[req._id] = req;
          else past[req._id] = req;
        else curr[req._id] = req;
        dates.push(new Date(req.startDate));
      });
      console.log(next);
      console.log(curr);
      console.log(past);

      setNextBooking(next);
      setCurrBooking(curr);
      setPastBooking(past);
      setDates(dates);
    });
  }, []);

  const handleChange = (panel: string) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAccept = (setState: any, id: string) => {
    updateAccept(id, true, false).then(() => {
      setState((prevState: any) => ({ ...prevState, [id]: { ...prevState[id], accept: true, decline: false } }));
    });
  };

  const handleDecline = (setState: any, id: string) => {
    updateAccept(id, false, true).then(() => {
      setState((prevState: any) => ({ ...prevState, [id]: { ...prevState[id], accept: false, decline: true } }));
    });
  };

  function statusSetter(isAccept: boolean, isDecline: boolean) {
    let res;
    if (isAccept === true && isDecline === false) res = 'ACCEPTED';
    if (isAccept === false && isDecline === true) res = 'DECLINE ';
    if (isAccept === false && isDecline === false) res = 'UNDECIDED';
    return res;
  }
  const next: any = nextBooking && Object.values(nextBooking).length > 0 ? Object.values(nextBooking)[0] : null;
  const profile = next ? next.profile : {};
  console.log(next);
  return (
    <Grid container component="main" className={`${classes.root}`}>
      <CssBaseline />

      <Grid container spacing={5} className={classes.innerContainer}>
        <Grid item className={classes.innerContainerItem}>
          {next && (
            <Card className={classes.cardTop}>
              <CardContent>
                <Typography variant="subtitle2" className={classes.sectionTitle}>
                  YOUR NEXT BOOKING:
                </Typography>
                <Typography variant="h6" className={classes.cardDate}>
                  {moment(next.startDate).format('D MMM  YYYY')}
                </Typography>
                <Grid container direction="row" alignItems="center">
                  <Avatar alt={profile.firstName} src={`${profile.images[0]}`} className={classes.cardAvatar} />
                  <Typography variant="h6">{`${profile.firstName} ${profile.lastName}`}</Typography>
                  <Typography variant="body2" className={classes.cardStatus}>
                    {statusSetter(next.accept, next.decline)}
                  </Typography>
                </Grid>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => handleAccept(setNextBooking, next._id)}>
                  Accept
                </Button>
                <Button size="small" color="primary" onClick={() => handleDecline(setNextBooking, next._id)}>
                  Decline
                </Button>
              </CardActions>
            </Card>
          )}
          <Card className={classes.cardBottom}>
            {currBooking && (
              <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                  <Typography className={classes.sectionTitle}>CURRENT BOOKINGS: </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="column">
                    {Object.values(currBooking).map((request: any) => (
                      <BookingCard
                        key={request._id}
                        booking={request}
                        handleAccept={handleAccept}
                        handleDecline={handleDecline}
                        setState={setCurrBooking}
                        showActions={true}
                      />
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )}
            {pastBooking && (
              <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                  <Typography className={classes.sectionTitle}>PAST BOOKINGS:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="column">
                    {Object.values(pastBooking).map((request: any) => (
                      <BookingCard
                        key={request._id}
                        booking={request}
                        handleAccept={handleAccept}
                        handleDecline={handleDecline}
                        setState={setPastBooking}
                        showActions={false}
                      />
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

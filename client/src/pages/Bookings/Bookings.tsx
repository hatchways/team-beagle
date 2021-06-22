import React,{useState} from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyle';
import { useSocket } from '../../context/useSocketContext';
import { useEffect } from 'react';
import BookingCard from '../../components/BookingCard/BookingCard';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
// import { Calendar } from '@material-ui/pickers/views/Calendar/Calendar';
import { DatePicker } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import moment from 'moment';
export default function Bookings(): JSX.Element {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  

  const current = [1, 2, 3];
  const past = [1, 2, ];

  const [date, setDate] = React.useState<any | null>(new Date());
  console.log(new Date())
  console.log(moment().format())
  return (
    <Grid container component="main" className={`${classes.root}`}>
      <CssBaseline />

      <Grid container spacing={5}  className={classes.innerContainer} >
        <Grid item className={classes.innerContainerItem}>
          <Card className={classes.cardTop}>
            <CardContent>
              <Typography variant="subtitle2" className={classes.sectionTitle}>
                YOUR NEXT BOOKING:
              </Typography>
              <Typography variant="h6" className={classes.cardDate}>
                5 April 2020, 10-12 AM
              </Typography>
              <Grid container direction="row" alignItems="center">
                <Avatar alt="Remy Sharp" src="https://source.unsplash.com/random" className={classes.cardAvatar} />
                <Typography variant="h6">Norma Byers</Typography>
              </Grid>
            </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary">
          Accept 
        </Button>
        <Button size="small" color="primary">
          Decline
        </Button>
      </CardActions>
          </Card>
          <Card className={classes.cardBottom}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                <Typography className={classes.sectionTitle}>CURRENT BOOKINGS: </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  {current.map((card) => (
                    <BookingCard key={card} />
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                <Typography className={classes.sectionTitle}>PAST BOOKINGS:</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  {current.map((card) => (
                    <BookingCard key={card} />
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Card>
        </Grid>
            <Grid item className={classes.innerContainerItem}>

            <Card  className={classes.cardCalander}>
          <DatePicker
            orientation="landscape"
            variant="static"
          value={date} 
          onChange={newDate => setDate(newDate)}
        />
        </Card>
            </Grid>




      </Grid>
      {/* container */}
    </Grid> //main
  );
}

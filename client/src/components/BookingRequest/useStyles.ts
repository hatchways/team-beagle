import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { Translate } from '@material-ui/icons';
import { relative } from 'path';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bookingCard: {
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 10px 0px;',
      padding: '45px',
    },
  bookingInfo: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardRate: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  rating: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '14px',
  },
  formArea: {
    width: "100%",
    [theme.breakpoints.down("lg")]: {
      width: '50%',
      }
  },
    form: {
    margin: 'auto',
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
        flexDirection: 'column',
  },
    location: {
        width: '100%',
    },
    label: {
    fontSize: 19,
    color: 'rgb(0,0,0,1)',
    fontWeight: 'bold',
    paddingLeft: '5px',
  },
  inputs: {
    border: '1px solid rgba(0,0,0,1)',
    borderRadius: '5px',
    marginTop: '.8rem',
    height: '2rem',
    padding: '10px',

  },
  date: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
    submit: {
    margin: theme.spacing(6, 0, 3),
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: theme.shape.borderRadius,
    fontSize: 12,
    backgroundColor: '#f04826',
    fontWeight: 'bold',
  },
  }),
);

export default useStyles;
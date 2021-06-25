import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: '#FAFAFB',
    width: '100%',
    height: '100%',
    padding: 0,
  },
  contentSection: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 'calc(100vh - 85px)',
    backgroundColor: '#F8F8F8',
    [theme.breakpoints.down("lg")]: {
      flexDirection: 'column',
      }
    },
    contentArea: {
    borderRadius: '5px',
    height: '80%',
    boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.2)',
    width: '900px',
    margin: 'auto',
    backgroundColor: '#fff',
    marginTop: 100,
    marginLeft: 250,
  },
  cardMedia: {
      height: '30%',
  },
  cardAvatar: {
    marginTop: '-50px',
    marginBottom: theme.spacing(1),
    width: '100px',
    height: 'auto',
    border: '1px solid black',
    display: 'flex',
    alignContent: 'center',
    margin: '0 auto',
  },
  cardName: {
    fontWeight: 'bolder',
    fontSize: '26px',
  },
  profileInfo: {
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    
  },
  infoSection: {
    height: 'auto',
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardBody: {
    height: '40%',
    marginLeft: '50px',
    marginRight: '50px',
  },
  cardDescription: {
    fontSize: '24px',
    marginTop: '20px',
  },
  cardText: {
      fontSize: '16px',
  },
  cardFooter: {
    fontSize: '.8rem',
    padding: theme.spacing(2, 3),
  },
  cardFooterLocation: {
    marginLeft: theme.spacing(1),
    opacity: 0.6,
  },
  cardFooterHr: {
    fontWeight: 'bolder',
  },
  bookingCard: {
    borderRadius: '5px',
    height: '60%',
    boxShadow: '5px 5px 15px 5px rgba(0,0,0,0.2)',
    width: '450px',
    margin: 'auto',
    backgroundColor: '#fff',
    marginTop: 100,
    marginLeft: 100,
  },
  bookingInfo: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: '14px',
    marginBottom: '14px',
  },
  cardRate: {
    marginTop: '24px',
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
}));

export default useStyles;

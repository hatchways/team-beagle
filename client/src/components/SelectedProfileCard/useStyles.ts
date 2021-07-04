  import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
      margin: '1rem',
      position: 'relative',
      flex: 1,
      marginLeft: '2rem',
      marginRight: '2rem',
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 10px 0px;',
  },
    contentArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '600px',

  },
  cardMedia: {
      height: '200px',
      width: '100%',
  },
  cardAvatar: {
    width: '125px',
    height: '125px',
    transform: 'translateY(-50%)',
    marginBottom: theme.spacing(1),
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
    marginTop: '-40px',
    marginBottom: '-10px',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    
  },
  divider: {
     width: '100%',
  },
  infoSection: {
    transform: 'translateY(-25%)',  
    height: 'auto',
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardBody: {
    height: '50%',
    width: '90%',
  },
  cardDescription: {
    display: 'flex',
    fontSize: '24px',
    marginTop: '12px',
    justifyContent: 'flex-start'
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

  }));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#FAFAFB',
    top: 0,
    left: 0,
    width: '100%',
    paddingTop: '20px',
    height: 'calc(100vh - 85px)',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  menuItem: {
    fontSize: '1.1rem',
    margin: '10px 40px',
    color: '#8D8D8D',
    hover: 'none',
    fontWeight: 800,
  },
  selectedMenuItem: {
    color: '#000000',
  },
  menuItems: {
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  menuContainer: {
    boxShadow: '0px 0px 8px #CACACA',
    borderRadius: '5px',
    overflowY: 'scroll',
    margin: '0 45px',
    height: 'calc((100vh - 85px) * .8)',
    flexGrow: 1,
    padding: '0 50px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      overflowY: 'unset',
      margin: 0,
      height: 'unset',
    },
  },
  buttonContainer: { height: '30px', marginBottom: '10px' },
  menuPaper: { width: '100%' },
  menuList: {},
}));

export default useStyles;

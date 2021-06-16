import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  authHeader: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },
  link: { textDecoration: 'none' },
  accBtn: {
    width: 170,
    height: 54,
    borderRadius: theme.shape.borderRadius,
    filter: 'drop-shadow(0px 2px 6px rgba(74,106,149,0.2))',
    backgroundColor: '#ffffff',
    color: '#f04826',
    border: '1px solid #f04826',
    boxShadow: 'none',
  },
}));

export default useStyles;

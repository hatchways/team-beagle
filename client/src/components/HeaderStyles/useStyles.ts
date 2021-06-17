import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
    backgroundColor: '#f04826',
    color: '#ffffff',
    boxShadow: 'none',
    marginRight: 35,
  },
}));

export default useStyles;

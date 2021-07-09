import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '60vh',
    overflowY: 'scroll',
    paddingTop: theme.spacing(3.2),
    maxWidth: '800px',
  },
}));

export default useStyles;

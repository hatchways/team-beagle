import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: 'calc(100vh - 85px)',
    backgroundColor: '#FFFFFF',
    alignContent: 'start',
  },

  dashboard: { backgroundColor: '#FFFFFF' },
}));

export default useStyles;

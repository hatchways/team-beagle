import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3.2),
  },
  innerContainer: {
    maxWidth: 1000,
    margin: 'auto',
  },
  innerContainerItem: {
    flexGrow: 1,
  },
  cardTop: {
    padding: theme.spacing(0.8),
  },
  cardBottom: {
    marginTop: theme.spacing(2.5),
    flexGlow: 1,
  },
  sectionTitle: {
    fontWeight: 'bolder',
    fontSize: theme.typography.pxToRem(13),
    marginTop: theme.spacing(1.2),
    marginBottom: theme.spacing(1.2),
  },

  cardCalander: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flexGrow: 1,
    padding: theme.spacing(0.8),
    margin: theme.spacing(1, 0),
  },
  dayPicker: {
    '& .DayPicker-Day--selected': {
      backgroundColor: `${theme.palette.primary.main} !important`,
      color: 'white !important',
      padding: `.4em .6em !important `,
    },
  },
}));

export default useStyles;

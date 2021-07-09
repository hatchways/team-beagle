import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3.2),
  },
  innerContainer: {
    maxWidth: 1000,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  innerContainerItem: {
    margin: theme.spacing(0, 1),
    flexGrow: 1,
  },
  cardTop: {
    padding: theme.spacing(0.8),
    marginBottom: theme.spacing(2.5),
  },
  cardBottom: {
    flexGlow: 1,
    marginBottom: theme.spacing(2.5),
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
    marginBottom: theme.spacing(2.5),
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
      [theme.breakpoints.down('sm')]: {
        padding: `.4em .4em !important `,
      },
    },
    '& .DayPicker-Month': {
      borderCollapse: 'separate',
      borderSpacing: '15px 5px',
      tableLayout: 'fixed',
      [theme.breakpoints.down('sm')]: {
        borderSpacing: '5px 5px',
      },
    },
    '& .DayPicker-Day': {
      width: `calc(100%/7)`,
    },
    '& .DayPicker-Day--today': {
      backgroundColor: `${theme.palette.warning.main} !important`,
      color: 'white !important',
    },
    '& .DayPicker-Caption div': {
      color: `${theme.palette.primary.main} !important`,
    },
  },
}));

export default useStyles;

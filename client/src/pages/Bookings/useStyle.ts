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
  cardDate: {
    marginBottom: theme.spacing(1.8),
  },
  cardAvatar: {
    marginRight: theme.spacing(1.2),
  },
  cardName: {
    fontWeight: 'bolder',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  cardCalander: {
    '& .MuiToolbar-root': {
      display: 'none',
    },
    '& .MuiPickersDatePickerRoot-toolbarLandscape': {
      display: 'none',
    },
    '& .MuiPickersBasePicker-pickerView': {
      margin: 'auto',
    },
    '& .MuiTypography-body1': {
      color: theme.palette.primary.main,
      fontWeight: 'bolder',
    },
  },
}));

export default useStyles;

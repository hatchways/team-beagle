import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    '& .StripeElement': {
      height: 53,
      padding: '16px 12px',
      width: '100%',
      backgroundColor: 'white',
      border: ' 1px solid  ',
      borderColor: theme.palette.grey[400],
      borderRadius: theme.shape.borderRadius,
    },
    '& .StripeElement--focus': {
      borderColor: theme.palette.primary.main,
    },

    '& .StripeElement--invalid': {
      borderColor: theme.palette.warning.main,
    },
    '& .StripeElement--webkit-autofill': {
      backgroundColor: `${theme.palette.secondary.light} !important`,
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1, 0),
    },
  },
  btn: {
    marginLeft: 'auto',
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1, 0),
    width: '100%',
  },
}));

export default useStyles;

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    '& .StripeElement': {
      height: 40,
      padding: '10px 12px',
      width: '100%',
      backgroundColor: 'white',
      border: ' 1px solid transparent',
      borderRadius: 4,
      boxShadow: ' 0 1px 3px 0 #e6ebf1',
      '-webkit-transition': 'box-shadow 150ms ease',
      transition: 'box-shadow 150ms ease',
    },
    '& .StripeElement--focus': {
      boxHhadow: '0 1px 3px 0 #cfd7df',
    },

    '& .StripeElement--invalid': {
      borderColor: '#fa755a',
    },
    '& .StripeElement--webkit-autofill': {
      backgroundColor: ' #fefde5 !important',
    },
  },
  btnSave: {
    marginLeft: 'auto',
    marginTop: theme.spacing(1),
  },
}));

export default useStyles;

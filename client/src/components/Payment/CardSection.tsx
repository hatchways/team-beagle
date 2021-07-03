import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { useTheme } from '@material-ui/core/styles';

function CardSection(): JSX.Element {
  const theme = useTheme();
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: theme.palette.text.primary,
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: theme.palette.grey[400],
        },
        margin: 'auto',
      },
      invalid: {
        color: theme.palette.primary.main,
        iconColor: theme.palette.primary.main,
      },
    },
  };
  return (
    <div className="MuiTextField-root">
      <label>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
    </div>
  );
}
export default CardSection;

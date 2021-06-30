import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import { getPaymentSecret } from '../../helpers/APICalls/payment';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import useStyles from './useStyles';

export default function Payment(): JSX.Element {
  const stripe = useStripe();
  const classes = useStyles();
  const elements = useElements();
  const [paymentSecret, setPaymentSecret] = useState<any>();

  useEffect(() => {
    getPaymentSecret().then((res: any) => {
      const secret = res.customerSecret;
      setPaymentSecret(secret);
    });
  }, []);

  const handleSubmit = async (event: any) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardSetup(paymentSecret, {
      payment_method: {
        card: elements.getElement(CardElement) || { token: '' },
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    });

    if (result.error) {
      // Display result.error.message in your UI.
    } else {
      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
    }
  };

  return (
    <FormGroup onSubmit={handleSubmit} className={classes.root}>
      <CardSection />
      <Button className={classes.btnSave} color="primary" variant="contained" disabled={!stripe}>
        Save Card
      </Button>
    </FormGroup>
  );
}

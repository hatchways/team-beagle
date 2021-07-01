import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import { getPaymentSecret } from '../../helpers/APICalls/payment';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import useStyles from './useStyles';
import Alert from '@material-ui/lab/Alert';
import { Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';

export default function Payment(): JSX.Element {
  const stripe = useStripe();
  const classes = useStyles();
  const elements = useElements();
  const [paymentSecret, setPaymentSecret] = useState<any>();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const [card, setCard] = useState<any>();
  const [billingDetails, setBillingDetails] = useState({
    email: '',
    name: '',
  });
  useEffect(() => {
    getPaymentSecret().then((res: any) => {
      const secret = res.customerSecret;
      setPaymentSecret(secret);
      console.log(res.card);
      if (res.card) setCard(res.card);
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
        billing_details: billingDetails,
      },
    });

    if (result.error) {
      // Display result.error.message in your UI.
      setError(result.error.message);
    } else {
      // The setup has succeeded. Display a success message and send
      // result.setupIntent.payment_method to your server to save the
      // card to a Customer
      setSuccess(true);
    }
  };

  const handleDelete = async (event: any) => {
    // card.id;
    setCard(null);
  };

  let cardInfo;
  if (card) cardInfo = card.card;
  return (
    <Grid className={classes.root}>
      {!card && (
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <TextField
                  label="Name"
                  id="name"
                  type="text"
                  placeholder="Jane Doe"
                  required
                  autoComplete="name"
                  variant="outlined"
                  value={billingDetails.name}
                  onChange={(e) => {
                    setBillingDetails({ ...billingDetails, name: e.target.value });
                  }}
                />
                <TextField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="janedoe@gmail.com"
                  required
                  autoComplete="email"
                  variant="outlined"
                  value={billingDetails.email}
                  onChange={(e) => {
                    setBillingDetails({ ...billingDetails, email: e.target.value });
                  }}
                />

                <CardSection />
                <Button
                  className={classes.btnSave}
                  color="primary"
                  variant="contained"
                  // onClick={handleSubmit}
                  disabled={!stripe}
                  type="submit"
                >
                  Save Card
                </Button>
                {error && <Alert severity="warning">{error}</Alert>}
                {success && <Alert severity="success">Card Saved</Alert>}
              </FormGroup>
            </form>
          </CardContent>
        </Card>
      )}
      {card && (
        <Grid>
          <Card>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography>{card.billing_details.name}</Typography>{' '}
                </Grid>

                <Grid item>
                  <Typography>{cardInfo.last4}</Typography>{' '}
                </Grid>
                <Grid item>
                  <Typography>{cardInfo.brand}</Typography>{' '}
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={handleDelete}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

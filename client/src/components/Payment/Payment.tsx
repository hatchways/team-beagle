import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import { getPaymentSecret, deletePaymentCard, addPaymentCard } from '../../helpers/APICalls/payment';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import useStyles from './useStyles';
import Alert from '@material-ui/lab/Alert';
import { Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import { useAuth } from '../../context/useAuthContext';

export default function Payment(): JSX.Element {
  const { loggedInUser, userProfile } = useAuth();
  const stripe = useStripe();
  const classes = useStyles();
  const elements = useElements();
  const [paymentSecret, setPaymentSecret] = useState<any>();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const [card, setCard] = useState<any>();
  const defaultBillingDetails = {
    email: loggedInUser?.email,
    name: `${userProfile?.firstName} ${userProfile?.lastName}`,
  };
  const [billingDetails, setBillingDetails] = useState(defaultBillingDetails);
  useEffect(() => {
    getPaymentSecret().then((res: any) => {
      const secret = res.customerSecret;
      setPaymentSecret(secret);
      if (res.card) setCard(res.card);
    });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card: any = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement) || { token: '' },
      billing_details: billingDetails,
    });
    const result = await addPaymentCard(card.paymentMethod.id);

    // const result = await stripe.confirmCardSetup(paymentSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement) || { token: '' },
    //     billing_details: billingDetails,
    //   },
    // });

    if (result.error) {
      setError(result.error.message);
    } else {
      setSuccess(true);
      setCard(result.attachedPaymentMethod);
      setBillingDetails(defaultBillingDetails);
    }
  };

  const handleDelete = (event: any) => {
    deletePaymentCard().then((res: any) => {
      if (!res.error) setCard(null);
    });
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

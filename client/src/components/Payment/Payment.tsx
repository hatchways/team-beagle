import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useAuth } from '../../context/useAuthContext';
import CardSection from './CardSection';
import { getPaymentSecret, deletePaymentCard, addPaymentMethod } from '../../helpers/APICalls/payment';
import useStyles from './useStyles';

import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Alert from '@material-ui/lab/Alert';
import { Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function Payment(): JSX.Element {
  const { loggedInUser, userProfile } = useAuth();
  const stripe = useStripe();
  const classes = useStyles();
  const elements = useElements();

  const defaultBillingDetails = {
    email: loggedInUser?.email,
    name: `${userProfile?.firstName} ${userProfile?.lastName}`,
  };
  const [billingDetails, setBillingDetails] = useState(defaultBillingDetails);
  const [paymentSecret, setPaymentSecret] = useState<string>();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<boolean>(false);
  const [card, setCard] = useState<any>();
  const [currency, setCurrency] = React.useState('EUR');

  const currencies = [
    {
      value: 'USD',
      label: 'USD',
    },
    {
      value: 'CAD',
      label: 'CAD',
    },
    {
      value: 'EUR',
      label: 'EUR',
    },
    {
      value: 'BTC',
      label: 'BTC',
    },
    {
      value: 'JPY',
      label: 'JPY',
    },
  ];

  useEffect(() => {
    getPaymentSecret().then((res: any) => {
      const secret = res.customerSecret;
      setPaymentSecret(secret);
      if (res.card) setCard(res.card);
    });
  }, []);

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    const card: any = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement || { token: '' },
      billing_details: billingDetails,
    });
    if (card.error) {
      setError(card?.error.message);
    } else {
      const result = await addPaymentMethod(card.paymentMethod.id, currency);

      if (result.error) {
        setError(result.error.message);
      } else {
        setSuccess(true);
        setCard(result.attachedPaymentMethod);
        setBillingDetails(defaultBillingDetails);
      }
    }
  };

  const handleDelete = () => {
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
                  id="outlined-select-currency"
                  select
                  required
                  label="Select"
                  value={currency}
                  onChange={handleCurrencyChange}
                  variant="outlined"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
                <Button className={classes.btn} color="primary" variant="contained" disabled={!stripe} type="submit">
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
              <Button className={classes.btn} color="primary" variant="contained" onClick={handleDelete}>
                Delete Card
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}

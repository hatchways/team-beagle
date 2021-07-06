import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Profile } from '../../interface/Profile';
import TextField from '@material-ui/core/TextField';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

import React, { useState, useEffect } from 'react';
import useStyles from './useStyles';
import { addReview, getReview, deleteReview } from '../../helpers/APICalls/review';

interface Props {
  profile: Profile | Record<string, never>;
}

export default function Review({ profile }: Props): JSX.Element {
  const classes = useStyles();
  const [reviews, setReviews] = useState<any>();
  const [value, setValue] = React.useState<number | null>(2);

  useEffect(() => {
    if (profile.userId) {
      getReview(profile.userId).then((res: any) => {
        console.log(res);
        setReviews(res.reviews);
      });
    }
  }, [profile.userId]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('submit');
  };

  return (
    <Card>
      <CardContent>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Write a customer review</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={handleSubmit} style={{ width: '100%', margin: '0 1em' }}>
              <Grid container direction="column">
                <Box mb={2} borderColor="transparent">
                  <Typography component="legend">Rating</Typography>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </Box>
                <Box mb={2} borderColor="transparent">
                  <Typography component="legend">Add a headline</Typography>
                  <TextField
                    required
                    id="title"
                    placeholder="What's most important to know?"
                    variant="outlined"
                    style={{ width: '100%' }}
                  />
                </Box>
                <Box mb={2} borderColor="transparent">
                  <Typography component="legend">Add a written review</Typography>
                  <TextField
                    required
                    id="body"
                    multiline
                    rows={4}
                    placeholder="What did you like or dislike?"
                    variant="outlined"
                    style={{ width: '100%' }}
                  />
                </Box>
                <Button color="primary" variant="contained" type="submit" style={{ marginLeft: 'auto' }}>
                  Submit
                </Button>
              </Grid>
            </form>
          </AccordionDetails>
        </Accordion>
        <List>
          {reviews &&
            reviews.map(({ profile, ...review }: any) => (
              <ListItem key={review._id}>
                <ListItemText
                  primary={
                    <Box mb={1}>
                      <Grid container alignItems="center">
                        <Avatar alt={profile.firstName} src={`${profile.images[0]}`} />
                        <Box mr={1} />
                        <Typography>{`${profile.firstName} ${profile.lastName}`}</Typography>
                      </Grid>
                    </Box>
                  }
                  secondary={
                    <React.Fragment>
                      <Grid container alignItems="center">
                        <Rating value={review.rating} readOnly />
                        <Box mr={1} />
                        <Typography variant="body2" color="textPrimary">
                          {review.title}
                        </Typography>
                      </Grid>

                      <Typography>{review.body}</Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
        </List>
      </CardContent>
    </Card>
  );
}

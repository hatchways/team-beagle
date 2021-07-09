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
import Button from '@material-ui/core/Button';
import { useAuth } from '../../context/useAuthContext';
import { ReviewIF } from '../../interface/Review';

import React, { useState, useEffect } from 'react';
import { addReview, getReview, deleteReview } from '../../helpers/APICalls/review';

interface Props {
  profile: Profile | Record<string, never>;
}

interface UserReview {
  rating: number;
  title: string;
  body: string;
}
interface ResultsArray {
  reviews: ReviewIF[];
  userSitterReviewCnt: number;
}
interface Results {
  reviews: ReviewIF;
}
export default function Review({ profile }: Props): JSX.Element {
  const { loggedInUser } = useAuth();
  const defaultReview = {
    rating: 0,
    title: '',
    body: '',
  };
  const [userReview, setuserReview] = React.useState<UserReview>(defaultReview);

  const [reviews, setReviews] = useState<ReviewIF[]>([]);
  const [userSitterReviewCnt, setUserSitterReviewCnts] = useState<number>(0);

  useEffect(() => {
    if (profile.userId) {
      getReview(profile.userId).then((res: ResultsArray) => {
        setReviews(res.reviews);
        setUserSitterReviewCnts(res.userSitterReviewCnt);
      });
    }
  }, [profile.userId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addReview(profile.userId, userReview.rating, userReview.title, userReview.body).then((res: Results) => {
      setReviews([res.reviews, ...reviews]);
      setuserReview(defaultReview);
    });
  };

  const handleDelete = async (reviewId: string) => {
    deleteReview(reviewId).then(() => {
      const newReviews = reviews.filter((rev: ReviewIF) => rev._id !== reviewId);
      setReviews(newReviews);
    });
  };

  if (reviews.length === 0 && userSitterReviewCnt == 0)
    return (
      <Card>
        <CardContent>
          <Grid container justify="center">
            <Typography variant="h6">No reviews</Typography>
          </Grid>
        </CardContent>
      </Card>
    );
  return (
    <Card>
      <CardContent>
        {userSitterReviewCnt > 0 && (
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
                      value={userReview.rating}
                      onChange={(event, newValue) => {
                        setuserReview({ ...userReview, rating: newValue || 0 });
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
                      value={userReview.title}
                      onChange={(e) => {
                        setuserReview({ ...userReview, title: e.target.value });
                      }}
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
                      value={userReview.body}
                      onChange={(e) => {
                        setuserReview({ ...userReview, body: e.target.value });
                      }}
                    />
                  </Box>
                  <Button color="primary" variant="contained" type="submit" style={{ marginLeft: 'auto' }}>
                    Submit
                  </Button>
                </Grid>
              </form>
            </AccordionDetails>
          </Accordion>
        )}
        <Box mb={2} />
        <Typography variant="subtitle1">Reviews</Typography>

        <List>
          {reviews &&
            reviews.map(({ profile, ...review }: ReviewIF) => (
              <ListItem key={review._id}>
                <Grid container>
                  <Grid container alignItems="center">
                    <Avatar alt={profile?.firstName} src={`${profile?.images[0]}`} />
                    <Box mr={1} />
                    <Typography>{`${profile?.firstName} ${profile?.lastName}`}</Typography>
                  </Grid>
                  <Grid container alignItems="center">
                    <Rating value={review.rating} readOnly />
                    <Box mr={1} />
                    <Typography variant="body2" color="textPrimary">
                      {review.title}
                    </Typography>
                  </Grid>

                  <Typography variant="body1" color="textSecondary">
                    {review.body}
                  </Typography>
                  {loggedInUser?.id === profile?.userId && (
                    <Button color="primary" onClick={() => handleDelete(review._id)} style={{ marginLeft: 'auto' }}>
                      delete
                    </Button>
                  )}
                </Grid>
              </ListItem>
            ))}
        </List>
      </CardContent>
    </Card>
  );
}

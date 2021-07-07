import { FetchOptions } from '../../interface/FetchOptions';
import { ReviewIF, ReviewWithProfile } from '../../interface/Review';

export async function addReview(
  sitterId: string,
  rating: number,
  title: string,
  body: string,
): Promise<{ reviews: ReviewWithProfile }> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rating, title, body }),
  };
  return await fetch(`/review/new-review/${sitterId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function getReview(sitterId: string): Promise<{ reviews: ReviewWithProfile[] }> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/review/${sitterId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function deleteReview(reviewId: string): Promise<{ reviews: ReviewIF[] }> {
  const fetchOptions: FetchOptions = {
    method: 'Delete',
    credentials: 'include',
  };
  return await fetch(`/review/delete/${reviewId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

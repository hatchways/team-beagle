export interface NewRequest {
  userId: string;
  sitterId: string;
  startDate: string;
  endDate: string;
}

export interface CreateRequestApiData {
  success?: string;
  error?: string;
}
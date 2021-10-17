export interface GetEstimatePayload {
  make: string;
  model: string;
  year: number;
  mileage: number;
  lng: number;
  lat: number;
}

export interface CreateEstimatePayload {
  reportDto: GetEstimatePayload & { price: number };
  user: {
    id: number;
    isAdmin: boolean;
    email: string;
    password: string;
  };
}

export interface ChangeApprovalPayload {
  id: string;
  approved: boolean;
}

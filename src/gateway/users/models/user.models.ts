export interface UpdateUserPayload {
  id: number;
  attrs: {
    id?: number;
    isAdmin?: boolean;
    email?: string;
    password?: string;
  };
}

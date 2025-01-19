import { FetchBaseQueryArgs } from '@reduxjs/toolkit/query';
import auth from '@app/utils/auth';

export const baseQuery: FetchBaseQueryArgs = {
  baseUrl: import.meta.env.VITE_REACT_APP_API_URL,
  prepareHeaders: headers => {
    const token = auth.token();
    headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
};

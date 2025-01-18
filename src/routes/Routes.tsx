import { Routes as DOMRoutes, Navigate, Route } from 'react-router-dom';

import NotFound from '@app/pages/NotFound';
import Rules from '@app/pages/Rules';
import { paths } from './Routes.utils';

const Routes = () => (
  <DOMRoutes>
    <Route path="/" element={<Navigate to={paths.rules} />} />
    <Route path={paths.rules} element={<Rules />} />
    <Route path="*" element={<NotFound />} />
  </DOMRoutes>
);

export default Routes;

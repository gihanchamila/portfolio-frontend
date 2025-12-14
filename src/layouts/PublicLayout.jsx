import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import BaseLayout from './BaseLayout';
import CircleLoader from '../components/utils/CircleLoader';

const PublicLayout = () => {
  return (
    <Suspense fallback={<CircleLoader />}>
      <BaseLayout topSpacing="lg:h-6 xs:h-0" headerSpacing="lg:h-16 xs:h-12">
        <Outlet />
      </BaseLayout>
    </Suspense>
  );
};

export default PublicLayout;

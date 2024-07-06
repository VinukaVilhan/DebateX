import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '100px' }}>{children}</div>
    </>
  );
};

export default AuthLayout;

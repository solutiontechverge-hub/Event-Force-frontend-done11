'use client';

import { usePageMount } from '@/hooks/usePageMount';
import AuthForm from '@/components/AuthForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

const LoginClient = () => {
  const isMounted = usePageMount();

  return (
    <AuthPageLayout isMounted={isMounted} requireAuth={false} redirectTo="/home">
      <AuthForm />
    </AuthPageLayout>
  );
};

export default LoginClient;

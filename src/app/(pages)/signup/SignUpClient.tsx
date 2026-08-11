'use client';

import { usePageMount } from '@/hooks/usePageMount';
import AuthForm from '@/components/AuthForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

const SignUpClient = () => {
  const isMounted = usePageMount();

  return (
    <AuthPageLayout
      isMounted={isMounted}
      requireAuth={false}
      redirectTo="/home"
      imageBreakpoint="md"
    >
      <AuthForm />
    </AuthPageLayout>
  );
};

export default SignUpClient;

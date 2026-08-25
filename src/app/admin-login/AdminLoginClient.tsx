'use client';

import DashboardAuthForm from '@/components/DashboardAuthForm';
import AuthPageLayout from '@/components/auth/AuthPageLayout';
import { usePageMount } from '@/hooks/usePageMount';

const AdminLoginClient = () => {
  const isMounted = usePageMount();

  const handleSocialLogin = (_provider: string) => {
    // Handle social login logic here
  };

  return (
    <AuthPageLayout
      isMounted={isMounted}
      imageSrc="/images/auth-bg.png"
      requireAuth={true}
    >
      <DashboardAuthForm
        mode="signin"
        onSocialLogin={handleSocialLogin}
        redirectTo="/admin/pricing"
      />
    </AuthPageLayout>
  );
};

export default AdminLoginClient;

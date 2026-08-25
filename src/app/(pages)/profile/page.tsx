import ProtectedRoute from '@/components/ProtectedRoute';
import ProfileClient from './ProfileClient';

export { metadata } from './metadata';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileClient />
    </ProtectedRoute>
  );
}

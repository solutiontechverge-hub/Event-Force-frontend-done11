import ProtectedRoute from "@/components/ProtectedRoute";
import ProfileClient from "./ProfileClient";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileClient />
    </ProtectedRoute>
  );
}

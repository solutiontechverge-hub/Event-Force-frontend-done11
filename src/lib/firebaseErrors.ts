export function getFirebaseErrorMessage(error: unknown): string {
  const code =
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code: unknown }).code === "string"
      ? (error as { code: string }).code
      : "";

  if (code === "permission-denied") {
    return "Firestore permission denied. Deploy security rules in Firebase Console (see firestore.rules).";
  }

  if (code === "unauthenticated") {
    return "Not signed in. Please log in again and retry.";
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return "An unexpected error occurred.";
}

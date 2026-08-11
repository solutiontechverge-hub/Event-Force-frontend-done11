# Firebase Rules Setup

Publish these rules in [Firebase Console](https://console.firebase.google.com) for project **eventforce-ffabe**.

## Firestore

1. Open **Firestore Database** → **Rules**
2. Paste contents of `firestore.rules`
3. Click **Publish**

This allows:
- Public read of `config/pricing` and `config/fleet` (prices/images on website)
- Authenticated users to save admin changes
- Users to read/write their own profile and bookings

## Storage

1. Open **Storage** → **Rules** (enable Storage first if not enabled)
2. Paste contents of `storage.rules`
3. Click **Publish**

This allows:
- Public read of uploaded fleet images
- Authenticated admin users to upload to `fleet/**`

## Deploy with Firebase CLI (optional)

```bash
firebase deploy --only firestore:rules,storage
```

If Firebase CLI is not initialized, use the Console steps above.

# Better Auth Account Linking Context

This project uses Better Auth with Google OAuth in `src/lib/auth.js`.

## Config in Use

```js
account: {
  accountLinking: {
    trustedProviders: ["google"],
    requireLocalEmailVerified: false,
  },
}
```

## What This Does

- `trustedProviders: ["google"]`
  - Treats Google as trusted for account linking.
  - If a user already exists with the same email (for example from email/password), Better Auth can link Google to that existing user.

- `requireLocalEmailVerified: false`
  - Does not require your app-local email verification before linking a trusted provider account.
  - Makes development/testing smoother and avoids strict linking rejections.

## Why This Was Added

You were getting this error after selecting a Google account:

- URL: `/api/auth/error?error=account_not_linked`
- Meaning: Better Auth found an existing user email but could not link the incoming Google account under current policy.

This config allows implicit linking for Google and resolves that flow in your app.

## Security Note

This setup is convenient for development.
For production, consider stricter rules:

- Require local email verification before linking.
- Or use an explicit/manual account-link flow from account settings.

## Operational Reminder

After changing auth config, restart the dev server so new settings are applied.

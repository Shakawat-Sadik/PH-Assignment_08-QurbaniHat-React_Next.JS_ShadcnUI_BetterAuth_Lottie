# Cloudinary Upload for Signup

This guide explains how to set up Cloudinary so each user can upload their own avatar, how to get the credentials, how to keep local development and Vercel in sync, and how the upload flow connects to Better Auth.

## Project Context

- **Auth handler**: [src/app/api/auth/[...all]/route.js](src/app/api/auth/[...all]/route.js) (Better Auth catch-all)
- **Signup page**: [src/app/auth/signup/page.jsx](src/app/auth/signup/page.jsx)
- **File input component**: [src/components/ui/file-upload.jsx](src/components/ui/file-upload.jsx)
- **Auth client**: [src/lib/auth-client.js](src/lib/auth-client.js)

There is currently no Cloudinary signing endpoint in the project. You will create one as part of the setup.

## Step 1: Create a Cloudinary Account and Find Your Credentials

If you have already registered and logged in, the next step is to open the Cloudinary Console.

### Where to look

In the Cloudinary dashboard, find:

- **Cloud Name**: the identifier for your Cloudinary account.
- **API Key**: public identifier used by your app when uploading.
- **API Secret**: private secret used only on the server when signing uploads.

### What each value means

- **Cloud Name** tells Cloudinary which account to upload into.
- **API Key** identifies the app request.
- **API Secret** proves the request was signed by your server.

### Important rule

- Do not put the API Secret in client-side code.
- Do not commit real secrets into a shared repository.

## Step 2: Set Up the Cloudinary Upload Preset Pattern for This Project

There are two common Cloudinary upload styles:

[-] **Unsigned uploads** using an upload preset.
[x] **Signed uploads** using a server-generated signature.

For this project, signed uploads are the better fit because they keep the API Secret off the browser and let your server control upload rules while still letting the user upload their own avatar from the browser.

### Recommended folder

Use a dedicated folder inside your Cloudinary media library for these profile images, for example:

- `assignment8-avatars`

This is not a folder inside your Next.js project. It is a Cloudinary upload folder used to keep avatar images organized.

You usually create it in one of two ways:

1. By uploading the first avatar with the `folder` value set to `assignment8-avatars`.
2. By creating the folder manually in the Cloudinary Media Library.

That makes cleanup and organization easier later.

## Step 3: Add the Environment Variables

Add these to your local environment file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

If you also want to keep the naming pattern consistent with your auth setup, the same variables should be added to Vercel later.

## Step 4: Sync the Same Values in Vercel

When the project is deployed, Vercel must receive the same Cloudinary variables.

### In Vercel

1. Open your project in Vercel.
2. Go to **Settings**.
3. Open **Environment Variables**.
4. Add the same three keys:
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
5. Add them for the environments you use:
   - **Development**
   - **Preview**
   - **Production**

### Why this matters

- Local dev reads from your local env file.
- Vercel reads from its own dashboard variables.
- If the values differ, local uploads may work while deployed uploads fail, or vice versa.

## Step 5: Create the Cloudinary Signing Endpoint

Your project currently has only the Better Auth catch-all route. Cloudinary needs a separate server endpoint that signs upload parameters.

Create a new route under the API folder, for example:

- `src/app/api/cloudinary/sign/route.js`

### What this route does

- Reads the Cloudinary values from environment variables.
- Creates a timestamp.
- Signs the upload request with the API Secret.
- Returns only public data to the browser.

### Signing route example

```js
import crypto from "crypto";

export async function POST() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return Response.json(
      { error: "Missing Cloudinary environment variables" },
      { status: 500 }
    );
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "assignment8-avatars";

  // Build signature: sorted params + api_secret, then SHA-1 hash
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign)
    .digest("hex");

  return Response.json({
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder,
  });
}
```

### Signing route — line-by-line explanation
- `import crypto from "crypto";` — Node's crypto module used to build SHA-1 signature.
- `export async function POST()` — Next.js route handler for POST requests from the browser.
- Read `process.env.*` — fetches `CLOUDINARY_*` values from the environment (keeps secret server-side).
- `if (!cloudName || !apiKey || !apiSecret)` — defensive check that returns a 500 error if credentials are missing.
- `const timestamp = Math.floor(Date.now() / 1000);` — short-lived timestamp to prevent replay attacks.
- `const folder = "assignment8-avatars";` — the Cloudinary folder where the upload will be stored.
- `const paramsToSign = \`folder=${folder}&timestamp=${timestamp}${apiSecret}\`` — Cloudinary requires signing the upload parameters concatenated with the API secret.
- `crypto.createHash("sha1").update(paramsToSign).digest("hex")` — produces the hexadecimal SHA-1 signature Cloudinary expects.
- `return Response.json({...})` — returns only public upload parameters (no secret) for the browser to use when uploading.

### Why this exists

- The browser cannot know the secret.
- Cloudinary only accepts signed uploads when the signature matches.
- This keeps the upload path secure while still allowing the user to upload an avatar directly from the browser.

## Step 6: Add the Upload Helper in Signup

In [src/app/auth/signup/page.jsx](src/app/auth/signup/page.jsx), create a helper that:

1. Calls your signing endpoint.
2. Builds a `FormData` object.
3. Sends the file directly to Cloudinary.
4. Returns the `secure_url`.

```jsx
const uploadToCloudinary = async (file) => {
  const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
  if (!signRes.ok) throw new Error("Failed to get upload signature");

  const { cloudName, apiKey, timestamp, signature, folder } = await signRes.json();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!uploadRes.ok) throw new Error("Cloudinary upload failed");

  const uploadResult = await uploadRes.json();
  return uploadResult.secure_url;
};
```

### Upload helper — line-by-line explanation
- `const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });` — requests signed params from your server; this call supplies the timestamp and signature the browser will use.
- `const { cloudName, apiKey, timestamp, signature, folder } = await signRes.json();` — extracts the signed fields returned by the server.
- `const formData = new FormData();` — builds the multipart form body required by Cloudinary's upload endpoint.
- `formData.append("file", file);` — attaches the File object selected by the user.
- `formData.append("api_key", apiKey);` — public API key required by Cloudinary.
- `formData.append("timestamp", String(timestamp));` — signed timestamp (string) must match what the server used to create the signature.
- `formData.append("signature", signature);` — server-generated signature proving the request is authorized.
- `formData.append("folder", folder);` — tells Cloudinary to place the image in the `assignment8-avatars` folder.
- `fetch(
    \`https://api.cloudinary.com/v1_1/${cloudName}/image/upload\`,
    { method: "POST", body: formData }
  );` — performs the direct browser → Cloudinary upload; response contains the `secure_url`.
- `return uploadResult.secure_url;` — returns the permanent URL you should store in Better Auth / MongoDB as the user's avatar.


## Step 7: Wire the Signup Form

Your current signup page already reads values from the form. The main change is to store the avatar file chosen by the user in state and use it before submitting to Better Auth.

### Suggested state

```jsx
const [selectedFile, setSelectedFile] = useState(null);
const [isLoading, setIsLoading] = useState(false);
```

### Suggested submit flow

```jsx
const handleForm = async (e) => {
  e.preventDefault();
  const ct = new FormData(e.currentTarget);
  const { email, name, username, password, avatar } = Object.fromEntries(ct);

  setIsLoading(true);

  try {
    // Determine which avatar image URL to use
    let imageUrl = "";

    if (selectedFile) {
      // Priority 1: Upload the user's selected avatar to Cloudinary
      imageUrl = await uploadToCloudinary(selectedFile);
    } else if (avatar && typeof avatar === "string") {
      // Priority 2: Use a manually entered avatar URL
      imageUrl = avatar.trim();
    }
    // Priority 3: No image (undefined)

    await authClient.signUp.email(
      {
        name,
        email,
        username,
        password,
        image: imageUrl || undefined,
        callbackURL: "/auth/signin",
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          router.push("/");
        },
        onError: (err) => {
          setIsLoading(false);
          console.error("Signup error:", err);
        },
      }
    );
  } catch (error) {
    setIsLoading(false);
    console.error("Form submission error:", error);
  }
};
```

## Step 8: Wire Up FileUpload Component

Use the file input component to capture the avatar chosen by the user and store it in state.

```jsx
<FileUpload 
  onChange={(newFiles) => {
    setSelectedFile(newFiles?.[0] ?? null);
  }}
/>
```

If you want to keep a fallback manual image URL, keep the `avatar` field in the form as well.

## Step 9: Understand the Data Flow

1. The user selects an avatar file in the signup page.
2. The selected file is stored in component state.
3. On submit, the page requests a signature from the server.
4. The server signs the request using the API Secret.
5. The user's browser uploads the avatar directly to Cloudinary.
6. Cloudinary returns a `secure_url`.
7. Better Auth receives that URL as the user image.
8. MongoDB stores the user record with the image URL.

## Step 10: Keep Local and Vercel Behavior Aligned

To keep your app behaving the same in both places:

- Use the same Cloudinary account in local dev and production unless you intentionally want separate buckets.
- Keep the same environment variable names in `.env` locally and in Vercel.
- Restart the local dev server after every env change.
- Redeploy or trigger a new Vercel deployment after changing env values in Vercel.

## Common Mistakes

- Putting the API Secret in client-side code.
- Forgetting to create the signing endpoint.
- Adding env variables locally but not in Vercel.
- Uploading a raw file object directly into Better Auth instead of a URL.
- Expecting the browser to sign Cloudinary uploads by itself.

## Testing Checklist

1. Add Cloudinary credentials to local env.
2. Add the same variables to Vercel.
3. Create the Cloudinary signing route.
4. Restart the dev server.
5. Select an avatar file on the signup page as a user would.
6. Submit the form.
7. Confirm the file uploads to Cloudinary.
8. Confirm Better Auth stores the returned `secure_url`.

## Final Note

If you want, the next best step is to actually implement the signing route and wire the signup page to use it.

## Debugging & Manual Testing

If you see errors like `{"error":{"message":"Unknown API key "}}` when hitting an upload URL directly, here's why and how to test correctly.

1) Correct upload endpoint

- Use your *cloud name* in the endpoint, not the folder. Correct format:

  `https://api.cloudinary.com/v1_1/<CLOUD_NAME>/image/upload`

  Example (your account): `https://api.cloudinary.com/v1_1/sadik-store/image/upload`

2) Why the `Unknown API key` error appears

- You made a GET request to the upload endpoint without credentials. Cloudinary expects a POST multipart upload with either:
  - signed fields: `api_key`, `timestamp`, `signature` (for signed uploads), or
  - an `upload_preset` configured for unsigned uploads.

3) Quick test using the Cloudinary Node SDK (recommended)

Create a test file at the project root `test-upload.js`:

```js
// test-upload.js
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config(); // reads CLOUDINARY_URL or CLOUDINARY_* env vars

const localFile = './path/to/local-avatar.jpg'; // replace with a real file path

cloudinary.uploader.upload(localFile, { folder: 'assignment8-avatars' })
  .then(res => console.log('uploaded:', res.secure_url))
  .catch(err => console.error('upload error:', err));
```

Install deps and run:

```bash
pnpm add cloudinary dotenv
node test-upload.js
```

This uses your `.env` values (`CLOUDINARY_URL` or `CLOUDINARY_API_KEY` + `CLOUDINARY_API_SECRET`) and avoids manual signature creation.

4) Example: browser flow (what the app must do)

- Browser POSTs to `/api/cloudinary/sign` → server returns `{ cloudName, apiKey, timestamp, signature, folder }`.
- Browser then POSTs `file` + `api_key` + `timestamp` + `signature` + `folder` to:

  `https://api.cloudinary.com/v1_1/<cloudName>/image/upload`

5) Example curl using server-signed fields

- First get signed fields from your signing route (example):

  ```bash
  curl -X POST http://localhost:3000/api/cloudinary/sign
  # returns JSON with timestamp, signature, apiKey, folder, cloudName
  ```

- Then upload with curl (replace placeholders):

  ```bash
  curl -X POST \
    -F "file=@./avatar.jpg" \
    -F "api_key=YOUR_API_KEY" \
    -F "timestamp=THE_TIMESTAMP" \
    -F "signature=THE_SIGNATURE" \
    -F "folder=assignment8-avatars" \
    "https://api.cloudinary.com/v1_1/your-cloud-name/image/upload"
  ```

6) Unsigned preset testing (alternative)

- If you create an unsigned upload preset in Cloudinary, you can POST `upload_preset=YOUR_PRESET` instead of signing. This is useful for quick testing but not recommended for production without restrictions.

7) About `CLOUDINARY_URL`

- Cloudinary supports a single `CLOUDINARY_URL` env var in the format:

  `cloudinary://<API_KEY>:<API_SECRET>@<CLOUD_NAME>`

- Your existing `.env` already contains `CLOUDINARY_URL`, so the SDK test will pick it up automatically.

Security reminder: never expose `CLOUDINARY_API_SECRET` in client code or public repos.

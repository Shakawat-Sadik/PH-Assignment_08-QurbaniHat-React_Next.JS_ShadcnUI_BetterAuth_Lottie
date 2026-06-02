# QurbaniHat

QurbaniHat is a Next.js app for browsing animals and managing user accounts with Better Auth. It uses shadcn UI components, Lottie animations, and Cloudinary for avatar uploads.

## Stack

- Next.js (App Router)
- Better Auth
- MongoDB
- shadcn UI
- Cloudinary (signed uploads)
- Lottie

## Getting Started

Install deps and start dev server:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

Build:

```bash
pnpm build
```

## App Structure

- Auth routes: src/app/auth
- API routes: src/app/api
- UI components: src/components
- Utilities: src/lib

## Environment Variables

Create a local env file (e.g. .env.local) and provide the following:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

If deploying to Vercel, add the same variables in the project settings for Development, Preview, and Production.

## Cloudinary Upload Guide

This app uses signed Cloudinary uploads for user avatars on signup. The browser requests a signed payload from the server, then uploads directly to Cloudinary. The returned secure URL is stored in Better Auth.

### Project Context

- Auth handler: src/app/api/auth/[...all]/route.js
- Signup page: src/app/auth/signup/page.jsx
- File input component: src/components/ui/file-upload.jsx
- Auth client: src/lib/auth-client.js

### Signed Uploads Overview

Signed uploads keep the API secret on the server and give you control over upload rules. Use a dedicated Cloudinary folder, for example: assignment8-avatars.

### Create the Signing Endpoint

Create this route:

src/app/api/cloudinary/sign/route.js

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

### Upload Helper (Signup Page)

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

### Data Flow

1. User selects a file on the signup page.
2. Browser calls /api/cloudinary/sign.
3. Server returns signed params.
4. Browser uploads the file to Cloudinary.
5. Cloudinary returns secure_url.
6. Better Auth stores the avatar URL.

### Common Mistakes

- Putting CLOUDINARY_API_SECRET in client code.
- Forgetting to create the signing endpoint.
- Using different env values locally vs Vercel.
- Uploading a raw file object to Better Auth instead of a URL.

### Debugging and Testing

If you see errors like Unknown API key, make sure you are sending a POST with api_key, timestamp, signature, and folder to:

https://api.cloudinary.com/v1_1/<CLOUD_NAME>/image/upload

Quick test with Node SDK:

```js
// test-upload.js
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config();

const localFile = "./path/to/local-avatar.jpg";

cloudinary.uploader
	.upload(localFile, { folder: "assignment8-avatars" })
	.then((res) => console.log("uploaded:", res.secure_url))
	.catch((err) => console.error("upload error:", err));
```

```bash
pnpm add cloudinary dotenv
node test-upload.js
```

## API Endpoint

- All together: https://api.npoint.io/8982ace3b4fd9eeb22fc
- Dynamically one: https://api.npoint.io/8982ace3b4fd9eeb22fc/[index]

## Notes

If you change any env variables, restart the dev server. If deploying, redeploy after updating Vercel environment variables.



# Cloudinary Upload Guide for Signup

This guide explains how to use your existing signing route and connect file upload to Better Auth signup.

## 1. Why you only need one route

You already have a signing endpoint at:
- [src/app/api/cloudinary/sign/route.js](src/app/api/cloudinary/sign/route.js)

That route is enough. It signs upload parameters on the server so your API secret never reaches the browser.

## 2. Required environment variables

Add these to your local environment file.

Example values:
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret

Important:
- Never keep secrets in markdown files long term.
- If a secret was exposed, rotate it in Cloudinary dashboard.

## 3. Upload flow overview

1. User selects an image file in the signup form.
2. Client calls POST /api/cloudinary/sign to get signed upload fields.
3. Client uploads the file directly to Cloudinary upload API.
4. Cloudinary returns secure_url.
5. Signup request sends image: secure_url to Better Auth.
6. MongoDB stores the URL in the user record.

## 4. Client-side integration pattern

Use this pattern in your signup page logic.

```jsx
const uploadToCloudinary = async (file) => {
  const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
  if (!signRes.ok) throw new Error("Unable to prepare Cloudinary upload");

  const { cloudName, apiKey, timestamp, signature, folder } = await signRes.json();

  const uploadFormData = new FormData();
  uploadFormData.append("file", file);
  uploadFormData.append("api_key", apiKey);
  uploadFormData.append("timestamp", String(timestamp));
  uploadFormData.append("signature", signature);
  uploadFormData.append("folder", folder);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: uploadFormData }
  );

  if (!uploadRes.ok) throw new Error("Cloudinary upload failed");

  const uploadResult = await uploadRes.json();
  return uploadResult.secure_url;
};
```

Then during signup submit:

```jsx
let imageUrl = typeof avatar === "string" ? avatar.trim() : "";

if (selectedFile) {
  imageUrl = await uploadToCloudinary(selectedFile);
}

await authClient.signUp.email({
  name,
  email,
  username,
  password,
  image: imageUrl || undefined,
  callbackURL: "/auth/signin",
});
```

## 5. About your FileUpload component

Your FileUpload component already passes selected files through onChange.

Expected usage in signup page:

```jsx
const [selectedFile, setSelectedFile] = useState(null);

const handleFileUpload = (newFiles) => {
  setSelectedFile(newFiles?.[0] ?? null);
};
```

UI usage:

```jsx
<FileUpload onChange={handleFileUpload} />
```

Note:
- You do not need to rely on FormData directImage from the form for this component.
- Keep selected file in state and upload that state value.

## 6. Optional URL fallback input

Keeping a manual avatar URL field is valid.

Priority recommendation:
1. If file is selected, upload file and use Cloudinary secure_url.
2. Else if URL input exists, use that URL.
3. Else send image as undefined.

## 7. Common mistakes checklist

- Using file object directly as image value in Better Auth.
- Forgetting to set environment variables.
- Exposing API secret in client code.
- Not handling failed upload responses.
- Not trimming manual URL input.

## 8. Quick test plan

1. Start app and open signup page.
2. Create user with file upload only.
3. Confirm created user image field is a Cloudinary secure_url.
4. Create user with manual URL only.
5. Confirm fallback path works.
6. Test with no avatar to confirm optional behavior.

## 9. Existing files involved

- Signup page: [src/app/auth/signup/page.jsx](src/app/auth/signup/page.jsx)
- Sign endpoint: [src/app/api/cloudinary/sign/route.js](src/app/api/cloudinary/sign/route.js)
- Better Auth server config: [src/lib/auth.js](src/lib/auth.js)

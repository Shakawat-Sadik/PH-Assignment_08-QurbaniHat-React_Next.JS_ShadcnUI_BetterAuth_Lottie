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
  const folder = "assignment8_avatars";

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
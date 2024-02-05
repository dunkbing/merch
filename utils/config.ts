export default {
  s3Endpoint: Deno.env.get("S3_ENDPOINT"),
  s3AccessKey: Deno.env.get("S3_ACCESS_KEY"),
  s3SecretKey: Deno.env.get("S3_SECRET_KEY"),
  tursoUrl: Deno.env.get("TURSO_URL"),
  tursoAuthToken: Deno.env.get("TURSO_AUTH_TOKEN"),
  lemonSqueezyApi: Deno.env.get("LEMONSQUEEZY_API"),
};

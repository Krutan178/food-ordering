// Absolute base URL for server-side (getServerSideProps) API calls.
// Set NEXT_PUBLIC_BASE_URL on your host (e.g. https://your-app.vercel.app).
// Local dev falls back to the default dev-server address.
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

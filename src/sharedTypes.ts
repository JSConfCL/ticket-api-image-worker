export interface Env {
  API_URL: string;
  APP_ENV: "production" | "dev" | "localhost";
  TICKETS_QR_IMAGES: KVNamespace;
}

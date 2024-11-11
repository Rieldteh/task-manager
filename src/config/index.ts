import dotenv from "dotenv";

dotenv.config();

interface Config {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET_KEY: string;
  COOKIE_SECURE: string;
}

export const config: Config = {
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  COOKIE_SECURE: process.env.COOKIE_SECURE as string,
} as const;

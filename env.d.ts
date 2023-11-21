declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN_SECRET: string;
      MONGO_URI: string;
      PORT: number;
    }
  }
}

export {};

declare namespace NodeJS {
  export interface ProcessEnv {
    // General across all .env.*
    readonly NODE_ENV: "development" | "production" | "test";
  }
}

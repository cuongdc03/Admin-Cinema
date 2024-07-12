interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

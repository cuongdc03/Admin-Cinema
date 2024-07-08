interface ImportMetaEnv {
    readonly VITE_BASE_URL: string;
    readonly NODE_ENV: 'development' | 'production' | 'test';
}
  
  interface ImportMeta {
    readonly env: ImportMetaEnv; 
  }
  
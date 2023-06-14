export default {
  base: process.env.NODE_ENV === 'production' ? '/simple-form-hexagonal/' : '/',
  build: {
    outDir: 'dist',
  },
  server: {
    proxy: {
      '/simple-signup-form': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
};

export default {
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

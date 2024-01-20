import vue from "@vitejs/plugin-vue";

export default {
  plugins: [
    vue(),
  ],
  root: `./src`,
  build: {
    outDir: '../dist'
  },
  server: {
    port: 5700
  },
  define: {
  },
}
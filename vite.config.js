// import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
// import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/


export default ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    define: { 'process.env': {} },
    plugins: [react()],
    server: {
      host: true,
      port: 3000,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  })
};
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://xguot.github.io",
  base: "/GammaSort",
  output: "static",
  integrations: [tailwind()],
});

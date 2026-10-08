import { existsSync, readFileSync, readdirSync } from "node:fs";
import { basename, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

const stockImageOverrides: Record<string, string> = {
  "sevn-bento-star.jpg": "stock-pastries.jpg",
  "sevn-bento.jpg": "stock-chocolate-dessert.jpg",
  "sevn-burger.jpg": "stock-savory-toast.jpg",
  "sevn-capsules.jpg": "stock-take-home.jpg",
  "sevn-collage-symphony.jpg": "stock-coffee-brew.jpg",
  "sevn-collage.jpg": "stock-cafe-story.jpg",
  "sevn-croissant-soft.jpg": "stock-croissants.jpg",
  "sevn-croissant.jpg": "stock-croissants.jpg",
  "sevn-cupcake.jpg": "stock-sharing.jpg",
  "sevn-cups-star.jpg": "stock-coffee-brew.jpg",
  "sevn-cups.jpg": "stock-latte.jpg",
  "sevn-donut.jpg": "stock-chocolate-dessert.jpg",
  "sevn-hero2.jpg": "stock-cafe-interior.jpg",
  "sevn-thankyou2.jpg": "stock-cafe-interior.jpg",
  "sevn-uniform-light.jpg": "stock-cafe-story.jpg",
  "sevn-uniform.jpg": "stock-cafe-story.jpg",
};

export function assetDescriptorPlugin(
  { emitAssets = true }: { emitAssets?: boolean } = {},
): Plugin {
  const prefix = "\0sevn-cafe-asset:";
  const assetsRoot = resolve(projectRoot, "src", "assets");
  const imageFiles = readdirSync(assetsRoot).filter((name) => /\.(?:jpe?g|png|webp)$/i.test(name));

  return {
    name: "sevn-cafe-asset-descriptors",
    enforce: "pre",
    buildStart() {
      if (!emitAssets) return;
      for (const name of imageFiles) {
        this.emitFile({
          type: "asset",
          fileName: `assets/${name}`,
          source: readFileSync(resolve(assetsRoot, name)),
        });
      }
    },
    resolveId: {
      order: "pre",
      handler(source) {
        if (!source.startsWith("@/assets/")) {
          return null;
        }

        const assetImport = source.slice("@/assets/".length);
        const isDescriptorImport = assetImport.endsWith(".asset.json");
        const imagePath = isDescriptorImport
          ? assetImport.slice(0, -".asset.json".length)
          : assetImport;
        if (!/\.(?:jpg|jpeg|png|webp)$/i.test(imagePath)) return null;

        const requestedPath = resolve(assetsRoot, imagePath);
        if (!requestedPath.startsWith(`${assetsRoot}${sep}`)) {
          throw new Error(`Image asset import is outside the assets directory: ${source}`);
        }

        const candidates = [requestedPath];
        if (!/\.png$/i.test(requestedPath)) {
          candidates.push(requestedPath.replace(/\.(?:jpg|jpeg|webp)$/i, ".png"));
        }
        const assetPath = candidates.find(existsSync);
        if (!assetPath) {
          throw new Error(`Missing image file for import ${source}. Checked: ${candidates.join(", ")}`);
        }

        return `${prefix}${JSON.stringify({ assetPath, isDescriptorImport })}`;
      },
    },
    load(id) {
      if (!id.startsWith(prefix)) return null;
      const { assetPath, isDescriptorImport } = JSON.parse(id.slice(prefix.length)) as {
        assetPath: string;
        isDescriptorImport: boolean;
      };
      const url = `/cafe-bakehaus/assets/${basename(assetPath)}`;
      return isDescriptorImport
        ? `export default { url: ${JSON.stringify(url)} };`
        : `export default ${JSON.stringify(url)};`;
    },
    transform(code, id) {
      if (!/\.[cm]?[jt]sx?(?:\?|$)|\.css(?:\?|$)/.test(id) || !code.includes("/__l5e/assets-v1/")) {
        return null;
      }

      const rewritten = code.replace(
        /\/__l5e\/assets-v1\/[^/"'`]+\/([^/"'`?#]+\.(?:jpg|jpeg|webp|png))(?![a-z])/gi,
        (originalUrl, filename: string) => {
          const localFilename =
            stockImageOverrides[filename] ?? filename.replace(/\.(?:jpg|jpeg|webp)$/i, ".png");
          if (!imageFiles.includes(localFilename)) {
            throw new Error(`Missing local image for ${originalUrl}. Expected src/assets/${localFilename}`);
          }
          return `/cafe-bakehaus/assets/${localFilename}`;
        },
      );

      return rewritten === code ? null : { code: rewritten, map: null };
    },
  };
}

export default defineConfig({
  base: "/cafe-bakehaus/",
  plugins: [assetDescriptorPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(projectRoot, "src"),
    },
  },
  build: {
    outDir: resolve(projectRoot, "../public/cafe-bakehaus"),
    emptyOutDir: true,
  },
});

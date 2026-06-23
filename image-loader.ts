// next/image does not prepend basePath to image `src`, so on a GitHub Pages
// project site (served under /deannaproject1) every image would 404. This
// custom loader prefixes the basePath. We don't resize (no server), so width
// is ignored and the original asset is served as-is.
export default function basePathLoader({ src }: { src: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${src}`;
}

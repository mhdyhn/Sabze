export function assetPath(path: string) {
  const basePath = "/Sabze";

  if (!path) return path;

  if (path.startsWith("http")) {
    return path;
  }

  if (path.startsWith(basePath)) {
    return path;
  }

  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
}

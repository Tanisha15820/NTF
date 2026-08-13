const rawBaseUrl = import.meta.env.VITE_BASE_URL || "";

const toBasePath = (url) => {
  if (!url) return "";
  try {
    return new URL(url).pathname.replace(/\/+$/, "");
  } catch {
    return url;
  }
};

export const BASE_URL = toBasePath(rawBaseUrl);
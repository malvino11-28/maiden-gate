const DEFAULT_API_URL = "http://127.0.0.1:8000/api";
const DEFAULT_STORAGE_BASE_URL = "http://127.0.0.1:8000";

export function getApiUrl() {
  return (import.meta.env.VITE_API_URL ?? DEFAULT_API_URL).replace(/\/+$/, "");
}

export function getApiBaseUrl() {
  const apiUrl = getApiUrl();

  return apiUrl.replace(/\/api\/?$/, "").replace(/\/+$/, "");
}

export function getStorageBaseUrl() {
  return (import.meta.env.VITE_STORAGE_URL ?? getApiBaseUrl() ?? DEFAULT_STORAGE_BASE_URL)
    .replace(/\/storage\/?$/, "")
    .replace(/\/+$/, "");
}

export function getStorageImageUrl(image?: string | null) {
  if (!image) return "";

  if (
    image.startsWith("http") ||
    image.startsWith("blob:") ||
    image.startsWith("data:")
  ) {
    return image;
  }

  if (image.startsWith("/assets/") || image.startsWith("/images/")) {
    return image;
  }

  const storageBaseUrl = getStorageBaseUrl();

  if (image.startsWith("/storage/")) {
    return `${storageBaseUrl}${image}`;
  }

  if (image.startsWith("storage/")) {
    return `${storageBaseUrl}/${image}`;
  }

  if (image.startsWith("/")) {
    return image;
  }

  return `${storageBaseUrl}/storage/${image}`;
}

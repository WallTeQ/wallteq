export const checkAuthToken = (): boolean => {
  if (typeof window === "undefined") return false;

  const token =
    localStorage.getItem("auth_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("access_token");

  return !!token;
};

export const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/auth";
  }
};

export const getStoredAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return (
    localStorage.getItem("auth_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("access_token")
  );
};

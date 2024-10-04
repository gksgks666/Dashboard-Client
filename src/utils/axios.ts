import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useFetchFnDirectLogout } from "@/hooks";

interface TokenStatus {
  tokenExpired: boolean;
  userId: string;
}

interface DecodedToken {
  exp: number;
  id: string;
}

// access token을 header에 포함한 axios 인스턴스
export const authApi = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
});

// access token을 포함하지 않는 일반 API 요청을 위한 axios 인스턴스 ex) login, register, logout, protected
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  withCredentials: true,
});

// token이 유효한지 체크
const isTokenExpired = (token: string | null): TokenStatus => {
  if (!token) return { tokenExpired: true, userId: "" };
  const { exp, id }: DecodedToken = jwtDecode<DecodedToken>(token);
  return { tokenExpired: Date.now() >= exp * 1000, userId: id };
};

// Request 인터셉터 설정
authApi.interceptors.request.use(
  async (config) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    let accessToken = localStorage.getItem("accessToken");
    const tokenInfo = isTokenExpired(accessToken);

    // 토큰 만료 여부 확인
    if (tokenInfo.tokenExpired) {
      //refresh api 호출하여 accessToken 및 refreshToken 재발급 후 저장
      try {
        const response = await axios.post(
          `${baseUrl}/api/userauth/refresh`,
          { userId: tokenInfo.userId },
          { withCredentials: true },
        );
        accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken!);
      } catch (error) {
        console.error("Failed to refresh access token", error);
        useFetchFnDirectLogout();
        throw error;
      }
    }

    // Authorization 헤더에 access token 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

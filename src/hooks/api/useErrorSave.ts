import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/utils/axios";
import axios from "axios";
import { useTypedSelector } from "@/hooks";

interface ErrorObject {
  requestValue?: any;
  config?: {
    url?: string;
    method?: string;
  };
  response?: {
    data?: any;
  };
  stack?: string;
}

interface FetchFnArgs {
  error: ErrorObject;
  userId: string;
}

const fetchFn = async ({ error, userId }: FetchFnArgs): Promise<void> => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const sendData = {
    userId,
    domain: "dashboard",
    requestValue: JSON.stringify(error?.requestValue) ?? null, // API 요청 파라미터 값들
    apiEndpoint: error?.config?.url ?? null, // API URL
    apiMethod: error?.config?.method ?? null, // HTTP 메서드
    responseValue: JSON.stringify(error?.response?.data) ?? null, // 서버에서 받은 값 (catch 내용)
    stackTrace: error?.stack ?? `${error}`, // 스택 트레이스 내용
  };
  //const { data } = await authApi.post(`/errorlog/errorsave`, sendData);
  await axios.post(`${baseUrl}/api/errorlog/storage`, sendData);
};

export const useErrorSave = () => {
  const userId = useTypedSelector((state) => state.user.userId);
  return useMutation({
    mutationFn: (error: ErrorObject) => fetchFn({ error, userId }),
  });
};

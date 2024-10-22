import { useMutation } from "@tanstack/react-query";
import { api, authApi } from "@/utils/axios";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useTypedDispatch } from "@/hooks/useRTKCustomhook";
import { setLogin } from "@/rtk/features/userSlice";
import { LoginProps, LoginResponse } from "@/types/API";
import { toast } from "@/utils/toast";

const fetchFn = async (props: LoginProps): Promise<LoginResponse> => {
  try {
    const { data } = await api.post<LoginResponse>(`/userauth/login`, props);

    //토큰 저장 및 사용자 정보 설정
    localStorage.setItem("accessToken", data.accessToken);

    // 보호된 API 호출
    await authApi.get("/userauth/protected");

    return data;
  } catch (error: any) {
    error.requestValue = props;
    throw error;
  }
};

export const useUserLogin = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  return useMutation<LoginResponse, AxiosError, LoginProps>({
    mutationFn: fetchFn,
    onSuccess: (data) => {
      dispatch(setLogin({ userId: data.userId, role: data.role }));
      navigate("/");
    },
    onError: () => toast(`다시 시도해 주세요.`),
  });
};

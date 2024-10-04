import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks";
import { RegisterProps } from "@/types/API";
import { MessageResponse } from "@/types/Common";
import { AxiosError } from "axios";

const fetchFn = async (props: RegisterProps): Promise<MessageResponse> => {
  try {
    const { data } = await api.post(`/userauth/register`, props);
    return data;
  } catch (error: any) {
    error.requestValue = props;
    throw error;
  }
};

export const useUserRegister = () => {
  const navigate = useNavigate();
  return useMutation<MessageResponse, AxiosError, RegisterProps>({
    mutationFn: fetchFn,
    onSuccess: () => {
      navigate("/login");
      useToast(`회원가입이 완료되었습니다. 로그인 후 이용해 주세요.`);
    },
    onError: () => {
      useToast(
        `회원가입이 정상적으로 처리되지 않았습니다. 잠시 후 다시 시도해 주세요.`,
      );
    },
  });
};

import { useMutation } from "@tanstack/react-query";
import { api } from "@/utils/axios";
import { useNavigate } from "react-router-dom";
import { setLogout } from "@/rtk/features/userSlice";
import { useTypedDispatch } from "@/hooks";
import { persistor } from "@/rtk";
import { useToast } from "@/hooks";

const fetchFn = async () => {
  try {
    await Promise.all([api.post(`/userauth/logout`), persistor.purge()]);
    localStorage.removeItem("accessToken");
  } catch (error: any) {
    //error.requestValue = props;
    throw error;
  }
};

export const useUserLogout = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: fetchFn,
    onSuccess: () => {
      navigate("/login");
      setTimeout(() => {
        dispatch(setLogout());
      }, 1000);
    },
    onError: () => {
      useToast(`정상 처리되지 않았습니다.`);
    },
  });
};

// 컴포넌트 외부에서도 호출할 수 있도록 logout 함수를 export
export const useFetchFnDirectLogout = async () => {
  await fetchFn();
};

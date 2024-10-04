import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/utils/axios";
import { useToast } from "@/hooks";
import { AxiosError } from "axios";
import { CustomerList, API_ArrResponseType } from "@/types/API";

interface AccountChangeProps {
  userId: string;
  accountstatus: boolean;
}

const fetchFn = async (
  props: AccountChangeProps,
): Promise<API_ArrResponseType<CustomerList>> => {
  try {
    const { data } = await authApi.post<API_ArrResponseType<CustomerList>>(
      `/management/customeraccountchange`,
      props,
    );
    return data;
  } catch (error: any) {
    error.requestValue = props;
    throw error;
  }
};

export const useCustomerAccountChange = () => {
  return useMutation<
    API_ArrResponseType<CustomerList>,
    AxiosError,
    AccountChangeProps
  >({
    mutationFn: fetchFn,
    /* onSuccess: () => {
      console.log("succes");
    }, */
    onError: () => {
      useToast(
        `계정 상태가 정상적으로 변경되지 않았습니다. 잠시 후 다시 시도해 주세요.`,
      );
    },
  });
};

/*
TData: 요청이 성공했을 때 반환되는 데이터의 타입 (response)
TError: 요청이 실패했을 때 발생하는 에러의 타입 (error)
TVariables: 뮤테이션 함수에 전달되는 변수의 타입 (props)
 */

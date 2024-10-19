import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { authApi } from "@/utils/axios";
import { AxiosError } from "axios";
import {
  UserList,
  API_ArrResponseType,
  APIQK_ObjectPropsQueryKey as QueryKeyType,
} from "@/types/API";
import { PaginationProps } from "@/types/Common";

const fetchFn = async ({
  queryKey,
}: QueryFunctionContext<QueryKeyType<PaginationProps>>): Promise<
  API_ArrResponseType<UserList>
> => {
  try {
    const params = queryKey[1];
    const { data } = await authApi.get<API_ArrResponseType<UserList>>(
      `/management/userlist`,
      {
        params,
      },
    );
    return data;
  } catch (error: any) {
    error.requestValue = queryKey[1];
    throw error;
  }
};

export const useGetUserList = (props: PaginationProps) => {
  return useQuery<
    API_ArrResponseType<UserList>,
    AxiosError,
    API_ArrResponseType<UserList>,
    QueryKeyType<PaginationProps>
  >({
    queryKey: queryKeys.userController.userList(props),
    queryFn: fetchFn,
    placeholderData: (previousData) => previousData,
  });
};

/* export function useQuery<
  TQueryFnData = unknown, //쿼리(queryFn)에서 반환하는 타입
  TError = Error, //queryFn에서 예상되는 오류 타입(error)
  TData = TQueryFnData //데이터 프로퍼티가 최종적으로 보유되는 타입, 보통은 TQueryFnData과 같은 타입을 지정
  TQueryKey extends QueryKey = QueryKey //queryFn에 전달된 queryKey를 사용하는 경우 해당 Querykey의 타입
  > */

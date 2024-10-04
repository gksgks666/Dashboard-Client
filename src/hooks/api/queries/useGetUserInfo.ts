import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { authApi } from "@/utils/axios";
import { AxiosError } from "axios";
import { UserList, APIQK_StringQueryKey } from "@/types/API";

const fetchFn = async ({
  queryKey,
}: QueryFunctionContext<APIQK_StringQueryKey>): Promise<UserList> => {
  try {
    const userId = queryKey[1];
    const { data } = await authApi.get<UserList>(`/general/user/${userId}`);
    return data;
  } catch (error: any) {
    error.requestValue = queryKey[1];
    throw error;
  }
};

export const useGetUserInfo = (userId: string) => {
  return useQuery<UserList, AxiosError, UserList, APIQK_StringQueryKey>({
    queryKey: queryKeys.userController.userInfo(userId),
    queryFn: fetchFn,
  });
};

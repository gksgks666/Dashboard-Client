import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { authApi } from "@/utils";
import {
  ErrorLogProps,
  ErrorLogList,
  API_ArrResponseType,
  APIQK_ObjectPropsQueryKey as QueryKeyType,
} from "@/types/API";
import { AxiosError } from "axios";

const fetchFn = async ({
  queryKey,
}: QueryFunctionContext<QueryKeyType<ErrorLogProps>>): Promise<
  API_ArrResponseType<ErrorLogList>
> => {
  try {
    const params = queryKey[1];
    const { data } = await authApi.get<API_ArrResponseType<ErrorLogList>>(
      `/errorlog/errorget`,
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

export const useGetError = (props: ErrorLogProps) => {
  return useQuery<
    API_ArrResponseType<ErrorLogList>,
    AxiosError,
    API_ArrResponseType<ErrorLogList>,
    QueryKeyType<ErrorLogProps>
  >({
    queryKey: queryKeys.dashboardController.error(props),
    queryFn: fetchFn,
    placeholderData: (previousData) => previousData,
  });
};

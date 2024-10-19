import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { authApi } from "@/utils/axios";
import {
  CustomerList,
  API_ArrResponseType,
  APIQK_ObjectPropsQueryKey as QueryKeyType,
} from "@/types/API";
import { PaginationProps } from "@/types/Common";
import { AxiosError } from "axios";

const fetchFn = async ({
  queryKey,
}: QueryFunctionContext<QueryKeyType<PaginationProps>>): Promise<
  API_ArrResponseType<CustomerList>
> => {
  try {
    const params = queryKey[1];
    const { data } = await authApi.get<API_ArrResponseType<CustomerList>>(
      `/management/customerlist`,
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

export const useGetCustomerList = (props: PaginationProps) => {
  return useQuery<
    API_ArrResponseType<CustomerList>,
    AxiosError,
    API_ArrResponseType<CustomerList>,
    QueryKeyType<PaginationProps>
  >({
    queryKey: queryKeys.userController.customerList(props),
    queryFn: fetchFn,
    placeholderData: (previousData) => previousData,
  });
};

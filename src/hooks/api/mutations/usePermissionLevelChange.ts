import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/utils/axios";
import { useToast } from "@/hooks";
import { UserList, API_ArrResponseType } from "@/types/API";
import { UserIdResponse } from "@/types/Common";
import { AxiosError } from "axios";

type PLCProps = UserIdResponse & Pick<UserList, "role">;
type PLCResponse = Omit<API_ArrResponseType<UserList>, "rowCount">;

const fetchFn = async (props: PLCProps): Promise<PLCResponse> => {
  try {
    const { data } = await authApi.post<PLCResponse>(
      `/management/rolechange`,
      props,
    );
    return data;
  } catch (error: any) {
    error.requestValue = props;
    throw error;
  }
};

export const usePermissionLevelChange = () => {
  return useMutation<PLCResponse, AxiosError, PLCProps>({
    mutationFn: fetchFn,
    onError: () => {
      useToast(
        `권한이 정상적으로 변경되지 않았습니다. 잠시 후 다시 시도해 주세요.`,
      );
    },
  });
};

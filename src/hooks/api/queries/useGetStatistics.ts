import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { authApi } from "@/utils/axios";
import { AxiosError } from "axios";
import { StatisticsList, APIQK_StringQueryKey } from "@/types/API";

const fetchFn = async (): Promise<StatisticsList> => {
  try {
    const { data } = await authApi.get<StatisticsList>(
      `/statistics/statistics`,
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const useGetStatistics = () => {
  return useQuery<
    StatisticsList,
    AxiosError,
    StatisticsList,
    APIQK_StringQueryKey
  >({
    queryKey: queryKeys.statisticsController.statistics(),
    queryFn: fetchFn,
  });
};

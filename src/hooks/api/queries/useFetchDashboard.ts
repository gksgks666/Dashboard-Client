import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./queryKey";
import { authApi } from "@/utils/axios";

const fetchFn = async () => {
  try {
    const { data } = await authApi.get(`/general/dashboard`);
    //const { data } = await axios.get(`${baseUrl}/general/dashboard`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useFetchDashboard = () => {
  return useQuery({
    queryKey: queryKeys.dashboardController.dashboard(),
    queryFn: fetchFn,
    placeholderData: (previousData, previousQuery) => previousData,
  });
};

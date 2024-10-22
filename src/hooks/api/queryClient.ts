import { QueryClient, QueryCache } from "@tanstack/react-query";
import { toast } from "@/utils/toast";
import { getErrorMessage } from "@/components/Helper/ErrorMessage";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, //5분
      gcTime: 10 * 60 * 1000, //10분
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const { enContent } = getErrorMessage(axiosError.response.status);
        toast(enContent);
      } else {
        toast("An unexpected error occurred");
      }
    },
  }),
});

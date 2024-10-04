import { QueryClient, QueryCache } from "@tanstack/react-query";
import { useToast } from "@/hooks";
import { getErrorMessage } from "@/components/Helper/ErrorMessage";
import { AxiosError } from "axios";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, //5분
      gcTime: 10 * 60 * 1000, //10분
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const { enContent } = getErrorMessage(axiosError.response.status);
        useToast(enContent);
      } else {
        useToast("An unexpected error occurred");
      }
    },
  }),
});

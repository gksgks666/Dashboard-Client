import {
  ErrorLogProps,
  APIQK_ObjectPropsQueryKey as QueryKeyType,
} from "@/types/API";
import { PaginationProps } from "@/types/Common";

export const queryKeys = {
  userController: {
    userInfo: (userId: string) => ["userInfo", userId],
    userList: (props: PaginationProps): QueryKeyType<PaginationProps> => [
      "userList",
      props,
    ],
    customerList: (props: PaginationProps): QueryKeyType<PaginationProps> => [
      "customerList",
      props,
    ],
  },
  dashboardController: {
    dashboard: () => ["dashboard"],
    error: (props: ErrorLogProps): QueryKeyType<ErrorLogProps> => [
      "error",
      props,
    ],
  },
  statisticsController: {
    statistics: () => ["statistics"],
  },
};

import { PaginationProps, Dispatcher } from "@/types/Common";

export interface UserList {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  token: string;
  __v: number;
  isDisabled?: boolean;
}

export type CustomerList = Omit<UserList, "isDisabled"> & {
  accountstatus: boolean;
};

export type UserListDispatcher = Dispatcher<UserList[]>;

export interface LoginProps {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  userId: string;
  role: string;
}

export interface RegisterProps extends LoginProps {
  name: string;
}

export interface ErrorLogList {
  _id: string;
  userId: string;
  domain: string;
  requestValue: string | null;
  apiEndpoint: string | null;
  apiMethod: string | null;
  responseValue: string | null;
  stackTrace: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ErrorLogProps extends PaginationProps {
  startDate: string;
  endDate: string;
}

export interface API_ArrResponseType<T> {
  message?: string;
  rowCount: number;
  dataArray: T[];
}

export type APIQK_ObjectPropsQueryKey<T> = [string, T];

export type APIQK_StringQueryKey = string[];

export interface StatisticsMonthlyData {
  monthlyData: Array<{
    month: string;
    totalSales: number;
    totalUnits: number;
  }>;
}

export interface StatisticsList {
  _id: string;
  totalCustomers: number;
  yearlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: StatisticsMonthlyData;
  dailyData: Array<{
    date: string;
    totalSales: number;
    totalUnits: number;
    _id: string;
  }>;
  salesByCategory: {
    shoes: number;
    clothing: number;
    accessories: number;
    misc: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

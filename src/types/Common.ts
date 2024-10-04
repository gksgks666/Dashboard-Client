import { Dispatch, SetStateAction } from "react";

export interface PaginationModel {
  page: number;
  pageSize: number;
} // pagination

export interface PaginationProps extends PaginationModel {
  search: string;
}

export type Dispatcher<T> = Dispatch<SetStateAction<T>>; //setState의 동적타입

export interface MessageResponse {
  message: string;
}

export interface UserIdResponse {
  userId: string;
}

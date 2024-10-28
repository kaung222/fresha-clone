import { AxiosError, AxiosResponse } from "axios";

type ResponseObject = {
    message: string;
};
export type ErrorResponse = AxiosError<ResponseObject>;
export type SuccessResponse = AxiosResponse<ResponseObject>;
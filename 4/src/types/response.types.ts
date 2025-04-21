export interface BaseResponse {
    success: boolean
    message?: string
    error?: any
}

export interface DataResponse<T> extends BaseResponse {
    data: T
}
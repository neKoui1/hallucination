

export interface BaseResponse {
    success: boolean
    message?: string
    error?: any
}

export interface DataResponse<T> extends BaseResponse {
    data: T
}

export interface UserData {
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface UserResponse extends DataResponse<UserData> {}

export interface UsersListResponse extends DataResponse<UserData[]>{}

export interface AuthUserData {
    user: {
        id:string,
        name: string,
        email: string,
    },
    token: string
}

export interface AuthResponse extends DataResponse<AuthUserData>{}


export interface ValidationErrorResponse extends BaseResponse {
    errors?: {
        [field: string]: string,
    }
}

export interface UnauthorizedResponse extends BaseResponse {

}

export interface NotFoundResponse extends BaseResponse {

}
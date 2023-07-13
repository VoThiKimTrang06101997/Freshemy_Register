import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";
import { login as loginAPI, getMe as getMeAPI, refreshToken as refreshTokenAPI } from "../../apis/auth";
import { register as registerAPI } from "../../apis/auth";
import { Login as LoginType } from "../../types/auth";
import { Register as RegisterType } from "../../types/auth";
import { User as UserType } from "../../types/user";
import Cookies from "js-cookie";
import { AppDispatch } from "../store";
// import AppThunk from "./AppThunk/appThunk.types";

type Auth = {
    user: User;
    isLogin: boolean;
};

const initialState: Auth = {
    user: {
        email: undefined,
        first_name: undefined,
        last_name: undefined,
        id: undefined,
    },
    isLogin: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUsers: (state, payload: PayloadAction<UserType>) => {
            state.user.description = payload.payload.description;
            state.user.email = payload.payload.email;
            state.user.first_name = payload.payload.first_name;
            state.user.last_name = payload.payload.last_name;

            //
            state.isLogin = true;
        },
        register: (state, payload: PayloadAction<RegisterType>) => {
            // Handle registration logic if needed
        },
    },
});

export const { setUsers } = authSlice.actions;

export default authSlice.reducer;

// @ts-ignore
export const login = (values: LoginType) => async (dispatch, getState) => {
    try {
        const { email, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match");
        }

        const response = await loginAPI(email, password);

        if (response.status >= 200 && response.status <= 299) {
            Cookies.set("accessToken", response.data.data.accessToken);
            Cookies.set("refreshToken", response.data.data.refreshToken);
            dispatch(getMe());
        } else {
            console.log(response.data.message);
        }
    } catch (error: any) {
        console.log(error);
    }
};

export const registerSuccess = createAction<UserType>("auth/registerSuccess");

// @ts-ignore

export const register = (values: RegisterType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
        const { email, password, confirmPassword, firstName, lastName } = values;
        const response = await registerAPI(email, password, confirmPassword, firstName, lastName);

        if (response.status >= 200 && response.status <= 299) {
            dispatch(registerSuccess(response.data.data));
        } else {
            console.log(response.data.message);
        }
    } catch (error: any) {
        console.log(error);
    }
};

export const getMe = () => async (dispatch: (arg0: { payload: User; type: "auth/setUsers"; }) => void) => {
    try {
        const response = await getMeAPI();

        if (response) {
            if (response.status >= 200 && response.status <= 299) {
                dispatch(setUsers(response.data.data));
            } else {
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                window.location.href = "/login";
            }
        }
    } catch (error: any) {
        console.log(error);
    }
};

export const refreshToken = async () => {
    try {
        const response = await refreshTokenAPI();

        if (response.status >= 200 && response.status <= 299) {
        } else {
            Cookies.set("accessToken", response.data.data.accessToken);
            window.location.href = "/login";
        }
    } catch (error: any) {
        console.log(error);
    }
};

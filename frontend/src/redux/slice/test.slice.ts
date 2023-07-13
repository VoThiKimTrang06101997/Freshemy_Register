import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'


// Đọc thêm tại đây : https://redux-toolkit.js.org/tutorials/quick-start
// https://redux-toolkit.js.org/api/createAsyncThunk

type UserState = {
    name: string;
    age: number;
};

const initialState: UserState = {
    name: "Thiên Đạt",
    age: 21,
};

const fetchUserById = createAsyncThunk("nameSlice/fetchUserById", async (userId: number, { rejectWithValue }) => {
    try {
        const response = await axios.get(`https://localhost:3000/api/user/${userId}`);
        return response.data;
    } catch (err: any) {
        return rejectWithValue("Có lỗi xảy ra");
    }
});

export const testSlice = createSlice({
    name: "nameSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserById.pending, (state) => {});
        builder.addCase(fetchUserById.fulfilled, (state, action: PayloadAction<UserState>) => {});
        builder.addCase(fetchUserById.rejected, (state, action) => {});
    },
});

export default testSlice.reducer;

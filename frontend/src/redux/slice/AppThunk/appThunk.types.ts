import { Action, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppDispatch>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default AppThunk;

import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./components/user.tsx";

const store = configureStore({
    reducer: {
        user: userReducer
    }
})

export default store
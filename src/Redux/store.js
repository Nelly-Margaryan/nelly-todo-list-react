import { configureStore } from '@reduxjs/toolkit';
import taskCounterReducer from "./Reducers/taskCount";
import loaderReducer from "./Reducers/isLoading";


const store = configureStore({
    reducer: {
        taskCount: taskCounterReducer,
        loader: loaderReducer,
    }
  })

export {store};
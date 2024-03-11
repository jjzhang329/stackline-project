import { configureStore} from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';

const store = configureStore({
    reducer: rootReducer,
    devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;
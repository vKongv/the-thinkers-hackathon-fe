import { routerReducer } from 'react-router-redux';
import { persistCombineReducers } from 'redux-persist';
import localForage from 'localforage';

const persistConfig = {
    key: 'root',
    storage: localForage,
};

export default persistCombineReducers(persistConfig, {
    routing: routerReducer,
});

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { filterSlice } from './filterSlice';
import { contactsSlice } from './contactsSlice';
import storage from 'redux-persist/lib/storage';
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedContactsReducer = persistReducer(
	persistConfig,
	contactsSlice.reducer
);

const persistedFilterReducer = persistReducer(
	persistConfig,
	filterSlice.reducer
);

export const store = configureStore({
	reducer: {
		contacts: persistedContactsReducer,
		filter: persistedFilterReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
<<<<<<< HEAD
import authReducer from "./auth/authSlice";

const authPersistConfig = {
  key: "auth", // Bu alan sadece auth reducer için kullanılacak
  storage,
  whitelist: ["token"], // Sadece token alanını persist etmek istiyoruz
=======
import authReducer from "./auth/slice";
import myProductsReducer from "./myProducts/slice";
import diaryProductsListItemReducer from "./diaryProductsListItem/slice"; //  Ekledik

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
>>>>>>> Murat/MyProducts
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    myProducts: myProductsReducer,
    diaryProductsListItem: diaryProductsListItemReducer, //  Buraya ekledik
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
<<<<<<< HEAD
        // redux-persist ile ilgili action'ları kontrol dışı bırak
=======
>>>>>>> Murat/MyProducts
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

<<<<<<< HEAD
export default store;
export let persistor = persistStore(store);
=======
export const persistor = persistStore(store);

export default store;
>>>>>>> Murat/MyProducts

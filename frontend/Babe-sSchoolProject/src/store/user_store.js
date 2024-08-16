import { createWithEqualityFn } from "zustand/traditional";
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import _ from "lodash";
import { persistant_store_name } from "../constants";
import { produce } from "immer";

const useUserStore = createWithEqualityFn(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => {
        console.log("setUser", user);
        set(
          produce((state) => {
            state.user = user ? _.cloneDeep(user) : null;
          })
        );
      },
    }),
    {
      name: persistant_store_name + ".user",
      //storage: createJSONStorage(() => localStorage),
      //whitelist: ["user"],
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Rehydration-UserStore error:", error);
        }
        console.log("onRehydrateStorage-UserStore", state);
      },
    }
  )
);

export default useUserStore;

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { persistant_store_name } from "../constants";
import { createWithEqualityFn } from "zustand/traditional";

const useCssVarsStore = createWithEqualityFn(
  persist(
    (set, get) => ({
      css_vars: {},
      setCssVars: (css_vars) => set({ css_vars }),
    }),
    {
      name: persistant_store_name,
      //storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state, error) => {
        console.log("onRehydrateStorage", state);
      },
    }
  )
);

export default useCssVarsStore;

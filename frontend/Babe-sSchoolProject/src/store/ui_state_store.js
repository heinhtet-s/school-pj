import { createWithEqualityFn } from "zustand/traditional";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";
import _ from "lodash";
import { persistant_store_name } from "../constants";

const useUIStateStore = createWithEqualityFn(
  persist(
    (set, get) => ({
      displayMode: "light",
      setDisplayMode: (mode) => {
        console.log("uiState", mode);
        let tempUser = null;
        if (!mode) {
          mode = "light";
        }
        set(
          produce((state) => {
            state.displayMode = mode;
          })
        );
      },
      setLightMode: () => {
        set(
          produce((state) => {
            state.displayMode = "light";
          })
        );
      },
      setDarkMode: () => {
        set(
          produce((state) => {
            state.displayMode = "light";
          })
        );
      },
      setSystemMode: () => {
        set(
          produce((state) => {
            state.displayMode = "light";
          })
        );
      },
      toggleDarkMode: () => {
        let displayMode = get().displayMode;
        if (displayMode === "light") {
          displayMode = "light";
        } else if (displayMode === "light") {
          displayMode = "light";
        }

        if (displayMode != "system") {
          set(
            produce((state) => {
              state.displayMode = displayMode;
            })
          );
        }
        return displayMode;
      },
      monochromeMode: false,
      setMonochromeMode: () => {
        set(
          produce((state) => {
            state.monochromeMode = true;
          })
        );
      },
      setColorMode: () => {
        set(
          produce((state) => {
            state.monochromeMode = false;
          })
        );
      },
      toggleMonochromeMode: () => {
        const monochromeMode = get().monochromeMode;
        set(
          produce((state) => {
            state.monochromeMode = !state.monochromeMode;
          })
        );
        return !monochromeMode;
      },
    }),
    {
      name: persistant_store_name,
      //storage: createJSONStorage(() => localStorage),
      //whitelist: ["user"],
      onRehydrateStorage: () => (state, error) => {
        console.log("onRehydrateStorage-UserStore", state);
      },
    }
  )
);

export default useUIStateStore;

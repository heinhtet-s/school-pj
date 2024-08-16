import useUIStateStore from "../store/ui_state_store";

const MONOCHROMEMODE_CLASS = "is-monochrome";

const setHtmlDataMode = (displayMode) => {
  document.documentElement.setAttribute("data-theme", "light");
  document.documentElement.setAttribute("data-mode", "light");
};

export const setDisplayMode = (displayMode) => {
  setHtmlDataMode(displayMode);
  const setDisplayMode = useUIStateStore.getState().setDisplayMode;
  setDisplayMode(displayMode);
};

export const getDisplayMode = () => {
  const displayMode = useUIStateStore.getState().displayMode;
  return displayMode;
};

export const loadDisplayMode = () => {
  const displayMode = useUIStateStore.getState().displayMode;
  console.log("loadDisplayMode", displayMode);
  setHtmlDataMode(displayMode);
};

export const toggleDarkMode = () => {
  const displayMode = useUIStateStore.getState().toggleDarkMode();
  setHtmlDataMode(displayMode);
};

export const getMonochromeMode = () => {
  const monochromeMode = useUIStateStore.getState().monochromeMode;
  return monochromeMode;
};

const setMonochromeModeClass = (monochromeMode) => {
  if (monochromeMode) {
    document.body.classList.add(MONOCHROMEMODE_CLASS);
  } else {
    document.body.classList.remove(MONOCHROMEMODE_CLASS);
  }
};

export const toggleMonochromeMode = (mode) => {
  const toggleMonochrome = useUIStateStore.getState().toggleMonochromeMode;
  const monochromeMode = toggleMonochrome();
  setMonochromeModeClass(monochromeMode);
};

export const setMonochromeMode = (monochromeMode) => {
  const setMonochromeMode = useUIStateStore.getState().setMonochromeMode;
  setMonochromeMode(monochromeMode);
  setMonochromeModeClass(monochromeMode);
};

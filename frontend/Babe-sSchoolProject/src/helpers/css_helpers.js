import useCssVarsStore from "../store/css_vars_store";

export const getCssVariable = (baseClass, stypeProperty) => {
  const button = document.querySelector(baseClass);
  console.log("button", button);
  if (button) {
    const computedStyle = getComputedStyle(button, "");
    const roundedBtn = computedStyle.getPropertyValue(stypeProperty);
    return roundedBtn?.trim();
  }
  return "";
};

export const getRoundedValue = () => {
  return getCssVariable(".btn", "--rounded-btn");
};

export const storeCssVariables = () => {
  const roundedBtn = getRoundedValue();
  const css_vars = {
    rounded: `rounded-[${roundedBtn}]`,
    borderRadius: roundedBtn,
  };
  useCssVarsStore.setState({ css_vars });
};

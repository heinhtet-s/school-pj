/* eslint-disable react/display-name */
import React from "react";
import { shallow } from "zustand/shallow";
import useCssVarsStore from "../store/css_vars_store";

const withCssVars = (WrappedComponent) => {
  return (props) => {
    const css_vars = useCssVarsStore((state) => state.css_vars, shallow);
    return <WrappedComponent {...props} css_vars={css_vars} />;
  };
};

export default withCssVars;

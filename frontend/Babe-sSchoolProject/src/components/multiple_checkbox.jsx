import React, { useState, useRef, useEffect } from "react";
import { Field } from "formik";

const CheckBoxes = (props) => {
  console.log(props);
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
          <input
            type="checkbox"
            {...props}
            checked={field.value?.includes(props.value)}
            onChange={() => {
              if (field.value?.includes(props.value)) {
                const nextValue = field.value.filter((value) => value !== props.value);
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
        </label>
      )}
    </Field>
  );
};

export default CheckBoxes;

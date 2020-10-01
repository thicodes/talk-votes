import React from "react";
import { useField } from "formik";
import TextField_ from "@material-ui/core/TextField";

export const TextField = (props: any) => {
  const { name, ...rest } = props;

  const [field] = useField(name);

  return <TextField_ {...field} {...rest} />;
};

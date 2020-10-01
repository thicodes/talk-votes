import React from "react";
import Button_, { ButtonProps } from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "rebass";

type ButtonType = {
  loading?: boolean;
} & ButtonProps;

export const Button = (props: ButtonType) => {
  const { children, loading, ...rest } = props;
  return (
    <Button_ disableElevation disabled={loading} {...rest}>
      {children}
      {loading && (
        <Box pl="10px">
          <CircularProgress size={14} />
        </Box>
      )}
    </Button_>
  );
};

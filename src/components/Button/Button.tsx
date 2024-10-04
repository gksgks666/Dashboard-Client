import { ReactNode, forwardRef } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";

interface CustomButtonProps extends MuiButtonProps {
  children: ReactNode;
  onClick?: (...args: any[]) => void;
  color?: "primary" | "secondary" | "error" | "success";
  size?: "small" | "medium" | "large";
  variant?: "text" | "outlined" | "contained";
  className?: string;
  sx?: SxProps<Theme>;
}

const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    { children, onClick, color, size, variant, className, sx = {}, ...props },
    ref,
  ) => {
    return (
      <MuiButton
        ref={ref}
        onClick={onClick}
        color={color}
        size={size}
        variant={variant}
        sx={sx}
        {...props}
      >
        {children}
      </MuiButton>
    );
  },
);

export default Button;

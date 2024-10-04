import { styled } from "styled-components";
import Button from "@/components/Button/Button";

interface DisabledButtonProps {
  isDisabled?: boolean;
}

export const DisabledButton = styled(Button)<DisabledButtonProps>`
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "auto")};
`;

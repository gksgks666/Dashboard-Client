import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getErrorMessage } from "@/components/Helper/ErrorMessage";
import Button from "@/components/Button/Button";
import { Box } from "@mui/material";

interface ErrorResponse {
  response?: {
    status?: number;
  };
}
interface ErrorFallbackProps {
  error: ErrorResponse | string;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  const status = (typeof error === "object" && error?.response?.status) || null;
  const navigate = useNavigate();
  const { title, content } = getErrorMessage(status);
  const isNotAuthorized = status === 401 || status === 403;
  const buttonMessage = isNotAuthorized ? "로그인" : "새로고침";
  const { pathname } = useLocation();
  const originalPathname = useRef<string>(pathname);

  useEffect(() => {
    if (pathname !== originalPathname.current) {
      resetErrorBoundary();
    }
  }, [pathname, resetErrorBoundary]);

  const onClickHandler = () => {
    if (isNotAuthorized) {
      navigate("/login");
    } else {
      resetErrorBoundary();
    }
  };

  return (
    <Box className="wrap">
      <h2 className="title">{title}</h2>
      <p className="content">{content}</p>
      <Button onClick={onClickHandler} variant="contained">
        {buttonMessage}
      </Button>
    </Box>
  );
};

export default ErrorFallback;

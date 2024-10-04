import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Helper/ErrorFallback";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { useErrorSave } from "@/hooks";

interface ErrorBoundaryProps {
  children: ReactNode;
  reset?: () => void;
}

const ErrorBoundaryComponent: React.FC<ErrorBoundaryProps> = ({
  children,
  reset,
}) => {
  const { mutate: errorSave } = useErrorSave();
  const errorRecord = (error: unknown): void => {
    errorSave(error as any);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={reset}
      onError={errorRecord} //외부 API에 기록
    >
      {children}
    </ErrorBoundary>
  );
};

const ErrorBoundaryWrapper: React.FC<ErrorBoundaryProps> = ({
  children,
  reset,
}) => {
  return (
    <QueryErrorResetBoundary>
      <ErrorBoundaryComponent reset={reset}>{children}</ErrorBoundaryComponent>
    </QueryErrorResetBoundary>
  );
};

export default ErrorBoundaryWrapper;

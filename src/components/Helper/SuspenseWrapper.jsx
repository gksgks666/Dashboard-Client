import { Suspense } from "react";
import Loading from "@/components/Helper/Loading";

const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default SuspenseWrapper;

import { ReactNode } from "react";
// import { Navigate } from "react-router-dom";
import { authStore, authType } from "../store/GlobalStore";
import { useRouter } from "next/navigation";

type PropsType = {
  children: ReactNode;
};

const RedirectToDashboard = (props: PropsType) => {
  const router = useRouter();
  const isAllowed = authStore(
    (state: unknown) => (state as authType).isAllowed
  );

  if (isAllowed) {
    router.push("/dashboard");
  }

  return props.children;
};

export default RedirectToDashboard;

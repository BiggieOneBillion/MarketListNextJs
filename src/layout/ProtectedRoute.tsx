import { ReactNode } from "react";
import { authStore, authType } from "../store/GlobalStore";
import { useRouter } from "next/navigation";

type PropsType = {
  children: ReactNode;
};

const ProtectedRoute = (props: PropsType) => {
  const router = useRouter();

  const isAllowed = authStore(
    (state: unknown) => (state as authType).isAllowed
  );

  if (!isAllowed) {
    router.push("/");
    return null;
  }

  return props.children;
};

export default ProtectedRoute;

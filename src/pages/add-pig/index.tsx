import { useDataByContext } from "@/ContextProvider";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GuineaList() {
  const { isAdmin } = useDataByContext();
  const router = useRouter();
  useEffect(() => {
    if (!isAdmin) router.push("/");
  }, []);
  return <Form></Form>;
}

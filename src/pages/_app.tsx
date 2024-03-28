import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ContextProvider } from "@/ContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      {/* Wrappo la radice della nostra app così da avere accesso ad ogni componente*/}
      <Component {...pageProps} />
    </ContextProvider>
  );
}

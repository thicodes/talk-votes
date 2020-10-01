import React from "react";
import { ReactQueryConfigProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import Talk from "./components/talk/Talk";
import "./App.css";

const queryConfig = {
  queries: {
    retry: 6,
    retryDelay: (attemptIndex: number) =>
      Math.min(1000 * 2 ** attemptIndex, 30000),
  },
};

function App() {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Talk />
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryConfigProvider>
  );
}

export default App;

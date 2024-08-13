import React from "react";
import { App } from "./_appEntry";

type PageProps = {
  children: React.ReactNode;
};

function Page({ children }: PageProps) {
  return <App>{children}</App>;
}

export { Page };

import { PropsWithChildren } from "react";
import { NextComponentType } from "next";
import Header from "../Header/Header";

type GlobalLayoutProps = PropsWithChildren<{}>;

const Layout: NextComponentType<{ children: GlobalLayoutProps }> = ({ children }) => {
  return (
    <div>
      <Header />
      { children }
    </div>
  );
};

export default Layout;
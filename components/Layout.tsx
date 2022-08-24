import { PropsWithChildren } from "react";
import { NextComponentType } from "next"

type GlobalLayoutProps = PropsWithChildren<{}>;

const Layout: NextComponentType<{ children: GlobalLayoutProps }> = ({ children }) => {
  return (
    <div>
      {/* Header here */}
      { children }
    </div>
  )
}

export default Layout;
import type {ReactNode} from "react";
import SideMenu from "@/components/SideMenu";
import Breadcrumb from "@/components/Breadcrumb";

export default function Wrapper({ children }: { children: ReactNode; }) {
  return (
    <div className={"flex flex-row my-10 w-3/4 mx-auto"}>
      <div className={"w-1/4"}>
        <SideMenu />
      </div>
      <div className={"w-3/4"}>
        <Breadcrumb />
        <div className={"p-3"}>
          {children}
s        </div>
      </div>
    </div>
  )
}
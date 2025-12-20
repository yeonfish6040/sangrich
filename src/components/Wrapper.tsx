import type {ReactNode} from "react";
import SideMenu from "@/components/SideMenu";
import Breadcrumb from "@/components/Breadcrumb";

export default function Wrapper({ children }: { children: ReactNode; }) {
  return (
    <div className={"flex flex-row my-10 w-3/4 mx-auto"}>
      <div className={"w-2/7"}>
        <SideMenu />
      </div>
      <div className={"w-5/7"}>
        <Breadcrumb />
        <div className={"p-3"}>
          {children}
        </div>
      </div>
    </div>
  )
}
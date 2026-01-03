import type {ReactNode} from "react";
import SideMenu from "@/components/SideMenu";
import Breadcrumb from "@/components/Breadcrumb";

export default function Wrapper({ children }: { children: ReactNode; }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 md:py-10 lg:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
        <div className="hidden w-full md:block md:w-1/4">
          <SideMenu />
        </div>
        <div className="w-full md:w-3/4">
          <Breadcrumb />
          <div className="pt-3 md:p-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

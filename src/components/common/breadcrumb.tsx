import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
type BreadCrumbProps = {
  page?: string;
  title?: string;
  data?: {
    name: string;
    link: string;
  }[];
};
export function AppBreadcrumb({ title, page, data }: BreadCrumbProps) {
  return (
    <>
      <div className=" ">
        <h5 className=" text-dashboardText font-[600] text-[18px] leading-[27px] capitalize">
          {title}
        </h5>
        <Breadcrumb className=" my-3">
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href={"/"}>Home</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {data?.map((link) => {
              return (
                <div
                  className="flex justify-center items-center gap-3"
                  key={link.name}
                >
                  <BreadcrumbItem>
                    <Link href={link.link}>{link.name}</Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </div>
              );
            })}
            <BreadcrumbItem>
              <BreadcrumbPage>{page}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
}

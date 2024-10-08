import { sidebar_items } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  open: boolean;
};

const SideBar = (props: Props) => {
  const { open } = props;
  const path = usePathname();
  console.log(path);

  const isActivePath = (name: string) => name === path;

  return (
    <div
      style={{ boxShadow: "rgba(60, 72, 88, 0.15) 0px 0px 3px 0px" }}
      className={` ${open
          ? " translate-x-0 lg:translate-x-[-300px] "
          : " translate-x-[-300px] lg:translate-x-0 "
        } duration-500  w-[300px] flex z-30 flex-col h-screen top-0 fixed bg-white left-0`}
    >
      {/* up side  */}
      <div className=" flex-grow-1 h-full overflow-auto [::-webkit-scrollbar]:hidden ">
        {/* logo  */}
        <div className=" px-[20px] py-[10px] h-[71px] flex items-center ">
          <Image
            fill
            className=" w-[115px] h-[22px] "
            src="https://shreethemes.in/doctris/layouts/assets/images/logo-dark.png"
            alt=""
          />
        </div>

        {/* menu  */}
        <div className=" border-t-[0.8px] py-[16px] border-t-[rgb(233,236,239)] ">
          {/* item  */}
          {sidebar_items.map(
            (el, index) => (
              // el?.children ? (
              //   <div key={index}>
              //     <Accordion type="single" collapsible>
              //       <AccordionItem value="item-1">
              //         <AccordionTrigger className="px-6 py-2 group hover:no-underline  ">
              //           <div className="flex items-center ">
              //             <span className=" w-9 h-9 bg-gray-100 flex justify-center items-center me-2 ">
              //               {el?.icon}
              //             </span>

              //             <span className=" text-dashboardText font-[500] text-[16px] leading-[24px] group-hover:text-button ">
              //               {el.name}
              //             </span>
              //           </div>
              //         </AccordionTrigger>
              //         <AccordionContent className=" py-[5px] ">
              //           {/* individual  */}
              //           {el?.children.map((item) => (
              //             <div
              //               key={item.id}
              //               className={cn(
              //                 "ps-[25px] ",
              //                 isActivePath(item?.link) && "bg-blue-300"
              //               )}
              //             >
              //               <Link
              //                 href={item.link}
              //                 className=" group px-[24px] py-[8px] flex items-center"
              //               >
              //                 <span className=" font-[500] text-[16px] leading-[24px] text-dashboardText group-hover:text-button ">
              //                   {item.child}
              //                 </span>
              //                 <IconAngle className=" size-4" />
              //               </Link>
              //             </div>
              //           ))}
              //         </AccordionContent>
              //       </AccordionItem>
              //     </Accordion>
              //   </div>
              // ) : (
              <div
                key={index}
                className={cn(
                  "",
                  isActivePath(el?.link) && " text-dashboardBlue"
                )}
              >
                <Link
                  className=" px-6 py-2 flex items-center group "
                  href={el.link}
                >
                  <span className=" w-9 h-9 bg-gray-100 flex justify-center items-center me-2 ">
                    {el?.icon}
                  </span>

                  <span
                    className={cn(
                      " text-slate-700 font-[500] text-[16px] leading-[24px] group-hover:text-dashboardBlue ",
                      isActivePath(el.link) && "text-dashboardBlue"
                    )}
                  >
                    {el.name}
                  </span>
                </Link>
              </div>
            )
            // )
          )}
        </div>
      </div>

      {/* under side  */}
      <div
        style={{ boxShadow: "rgba(60, 72, 88, 0.15) 0px 0px 3px 0px" }}
        className=" py-[9px] ps-5 pe-6  "
      >
        <div
          style={{
            boxShadow: "rgba(57, 108, 240, 0.357) 0px 2.34456px 3.9076px 0px",
          }}
          className=" ms-1 size-9 rounded-full flex justify-center items-center border-dashboardBlueShadow hover:border-dashboardBlue hover:bg-dashboardBlue bg-[#dee6edae] group "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 stroke-dashboardBlue group-hover:stroke-white "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

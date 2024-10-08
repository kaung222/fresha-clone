import Link from "next/link";

import { Service } from "@/types/service";
import IconAngle from "@/components/icons/IconAngle";
import { truncateString } from "@/lib/utils";
import Image from "next/image";

const ServiceCard = ({ service }: { service: Service }) => {
  return (
    <>
      <div className=" mt-6 relative px-3 w-full font-head ">
        <div
          style={{ boxShadow: "rgba(60, 72, 88, 0.15) 0px 0px 3px 0px" }}
          className=" w-full bg-white rounded-[5px] "
        >
          <Image
            fill
            src={service.thumbnailUrl}
            className=" w-full aspect-video"
            alt=""
          />
          <div className="p-6 pt-2 ">
            <h2 className="block font-[700] mb-3 leading-[27px] text-[20px] text-heading ">
              {service.name}
            </h2>

            <div className=" space-x-1">
              {service.tags.map((tag) => (
                <span
                  className="p-1 border capitalize border-slate-500 text-xs rounded-md"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-2 text-sm text-slate-500">
              {truncateString(service.description, 70)}
            </p>
            <div className=" mt-4 flex justify-between ">
              <p className=" text-slate-500 text-sm"> $ {service.price}</p>
              <div className=" font-[400] flex items-center text-[15px] leading-[22.5px] text-button ">
                <Link href={`/services/${service.id}`}>Service More</Link>
                <IconAngle className=" size-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;

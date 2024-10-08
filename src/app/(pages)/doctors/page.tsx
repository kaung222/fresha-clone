import { AppBreadcrumb } from "@/components/common/breadcrumb";
import { AddDoctor, DoctorList } from "@/components/pages/doctor";
import DoctorCreateDialog from "@/components/pages/doctor/addDoctors";
import DoctorTable from "@/components/pages/doctor/DoctorTable";

const page = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <AppBreadcrumb page="Doctors" />
        {/* <AddDoctor /> */}
        <DoctorCreateDialog />
      </div>
      <DoctorTable />
    </>
  );
};

export default page;

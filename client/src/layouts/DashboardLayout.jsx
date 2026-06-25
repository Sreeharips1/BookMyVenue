import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";

const DashboardLayout = ({ role, title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-[#09122C] flex">
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader role={role} title={title} subtitle={subtitle} />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;

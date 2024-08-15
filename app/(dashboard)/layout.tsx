import Navbar from "./_components/navbar";
import Sidebar from "./_components/sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function LayoutDashboard({ children }: LayoutProps) {
  return (
    <main className="h-full">
      <div className="md:pl-56 inset-y-0 fixed w-full h-[80px]">
        <Navbar />
      </div>
      <aside className="hidden h-full inset-y-0 w-56 md:flex flex-col fixed z-50">
        <Sidebar />
      </aside>
      <aside className="md:pl-56 pt-[80px] h-full">{children}</aside>
    </main>
  );
}

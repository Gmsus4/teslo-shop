import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({ children }: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen md:flex md:flex-col md:h-[100%] md:justify-between md:items-center">
      <TopMenu/>
      <Sidebar />

      <div className="px-0 sm:px-10"> {/* sm:px-10 */}
          { children }  
      </div>

      <Footer />
    </main>
  );
}
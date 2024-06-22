import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({ children }: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex flex-col h-full justify-between lg:items-center">
      <TopMenu/>
      <Sidebar />

      <div className="px-2 sm:px-10"> {/* sm:px-10 */}
          { children }  
      </div>

      <Footer />
    </main>
  );
}
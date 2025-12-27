import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

// export const metadata: Metadata = {
//     title: "Lama Dev School Management Dashboard",
//     description: "Next.js School Management System",
// };

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const { sessionClaims } = await auth();
    // const role = (sessionClaims?.metadata as { role?: string })?.role;

    return (
        <div className="h-screen flex">
            {/*left navbar  */}
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14]">
                <Link
                    href="/"
                    className="flex items-center lg:justify-start gap-2">
                    <Image src="/logo.png" alt="Logo" width={32} height={32} />
                    <span className="hidden lg:block font-bold">Schoolms</span>
                </Link>
                <Menu />

            </div>
            {/*main content */}
            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll">
                <Navbar />
                {children}
            </div>


        </div>


    );
}

"use client";

import { usePathname } from "next/navigation";
import NavBarButtons from "@/components/Home/nav-buttons";

export default function ConditionalNavBar() {
    const pathname = usePathname();
    if (pathname === "/captcha") return null;
    return <NavBarButtons />;
}

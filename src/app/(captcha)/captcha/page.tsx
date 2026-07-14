import { redirect } from "next/navigation";
import CaptchaButtons from "@/components/Captcha/captcha-buttons";

type Props = {
    searchParams: Promise<{ req?: string }>;
};

export default async function CaptchaPage({ searchParams }: Props) {
    const { req } = await searchParams;

    if (!req) {
        redirect("/");
    }

    return <CaptchaButtons queryId={req} />;
}

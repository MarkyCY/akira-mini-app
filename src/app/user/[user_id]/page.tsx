import ShowUser from "@/components/Home/User/showUser";

type PageProps = {
    params: Promise<{ user_id: string }>;
};

export default async function UserPage({ params }: PageProps) {
    const resolvedParams = await params;
    const { user_id } = resolvedParams;

    const userIdNumber = Number(user_id);

    return (
        <div className="w-full h-auto max-w-sm bg-white rounded-lg dark:bg-neutral-950">
            <div className="w-full max-w-2xl">
                <ShowUser user_id={userIdNumber} />
            </div>
        </div>
    );
}
import ShowUser from "@/components/Home/User/showUser";


export default async function UserPage({ params }: { params: { user_id: number } }) {
    const { user_id } = params;

    return (
        <div className="w-full h-auto max-w-sm bg-white rounded-lg dark:bg-neutral-950">
            <div className="w-full max-w-2xl">
                <ShowUser user_id={user_id} />
            </div>
        </div>
    );
}
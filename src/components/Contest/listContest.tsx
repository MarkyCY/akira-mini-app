import { useEffect, useState } from "react";
import { getContests } from "@/components/Contest/getContests";
import ViewContest from "@/components/Contest/ViewContest";
// import Cookies from 'js-cookie';
import { useSession, signOut } from "next-auth/react";
import OtakuLoadIcon from "../icons/otakuLoad";
import { useTheme } from "next-themes";

export default function ContestList() {
    const [data, setData] = useState<Contest[] | null>(null);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const { theme } = useTheme()
    
    const token = session?.user?.accessToken;

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    setLoading(true);
                    const responseData = await getContests(token);
                    setData(responseData);
                } catch (error: any) {
                    console.error('Error al obtener los datos:', error);
                    if (error.message === '401') {
                        signOut();
                    }
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [token]);

    const handleChange = () => {
        const fetchData = async () => {
            if (token) {
                const responseData = await getContests(token);
                setData([...responseData]);
            }
        };

        fetchData();
    }
    return (
        <>
            {loading ? (
                <OtakuLoadIcon color={theme === "dark" ? "#ea527d" : "#b50638"} className="w-full size-40 p-5" />
            ) : data && data?.length > 0 ? (
                data.map((contest) => (
                    <ViewContest key={contest.id} contest={contest} suscribeChange={handleChange} />
                ))
            ) : (<h1 className="fixed inset-0 flex flex-col items-center justify-center h-screen text-gray-400 text-xl font-bold">No hay concursos activos</h1>)}
            
        </>
    )
}
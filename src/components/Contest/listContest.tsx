"use client";
import { useEffect, useState } from "react";
import { getContests } from "@/components/Contest/getContests";
import ViewContest from "@/components/Contest/ViewContest";
import Cookies from 'js-cookie';

export default async function ContestList() {
    const [data, setData] = useState<Contest[] | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        try {
            const token = Cookies.get('token') || null;
            const fetchData = async () => {
                if (token) {
                    const responseData = await getContests(token);
                    setData(responseData);
                }
            };

            fetchData();
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            setLoading(false);
        }
        finally {
            setLoading(false);
        }
    }, []);

    const handleChange = () => {
        const token = Cookies.get('token') || null;
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
                <h1 className="fixed inset-0 flex flex-col items-center justify-center h-screen text-gray-400 text-xl font-bold">Cargando...</h1>
            ) : data && data?.length > 0 ? (
                data.map((contest) => (
                    <ViewContest key={contest.id} contest={contest} suscribeChange={handleChange} />
                ))
            ) : (<h1 className="fixed inset-0 flex flex-col items-center justify-center h-screen text-gray-400 text-xl font-bold">No hay concursos activos</h1>)}
        </>
    )
}
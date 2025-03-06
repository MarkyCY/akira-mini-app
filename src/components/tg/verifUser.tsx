'use server';

export const verifUser = async (user_id: number) => {
    const BOT_TOKEN = process.env.BOT_TOKEN;
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getChatMember?chat_id=-1001485529816&user_id=${user_id}`);
        if (!response.ok) {
            console.error('Error al obtener los datos');
            throw new Error('Error al obtener los datos');
        }
        
        const data = await response.json();
        if (data.result.status === 'kicked' || data.result.status === 'left') {
            console.error('Usuario no es miembro del grupo ' + data.result.status);
            throw new Error('Usuario no es miembro del grupo');
        }
        return data;

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return { ok: false, message: 'El usuario no es miembro del grupo' };
    }
};
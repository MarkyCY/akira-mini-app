'use server';

const token = process.env.BOT_TOKEN;

export async function ShareMedia(chatId: number | string, photoUrl: string, thumb_url: string = '', caption: string, label: string, link: string) {
    const payload = {
              photo_url: photoUrl, // URL de la imagen
              thumb_url: thumb_url, // URL de la miniatura
              caption: caption,
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: label,
                      url: link, // Enlace del botón
                    },
                  ],
                ],
              },
            };
        
            try {
        
              // 2. Guardar el mensaje preparado usando savePreparedInlineMessage
              const response = await fetch(`https://api.telegram.org/bot${token}/savePreparedInlineMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  user_id: chatId,
                  allow_user_chats: true,
                  allow_bot_chats: true,
                  allow_group_chats: true,
                  allow_channel_chats: true,
                  result: {
                    type: 'photo',
                    id: 'photo-' + Date.now(), // ID único para el mensaje
                    title: 'Noticias',
                    parse_mode: 'Markdown',
                    ...payload,
                  },
                }),
              });
        
              const data = await response.json();
        
              // 3. Si el mensaje se guardó correctamente
              if (data.ok && data.result) {
                return data.result.id; // ID del mensaje guardado
              } else {
                throw new Error('Error al guardar el mensaje');
              }
            } catch (error) {
              console.error('Error:', error);
              alert('Error al procesar el mensaje');
            }
}
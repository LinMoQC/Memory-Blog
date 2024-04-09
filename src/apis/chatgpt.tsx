import axios from 'axios';

interface ChatGPTResponse {
    id: string;
    object: string;
    model: string;
    choices: {
        id: string;
        object: string;
        index: number;
        message: {
            role: string;
            content: string;
            metadata?: any;
        };
        finish_reason: string;
    }[];
}

export default async function generateResponse(prompt: string): Promise<string> {
    const apiKey = import.meta.env.VITE_CHAT_GPT_TOKEN;  //替换你的key
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
    };
    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
            {
                role: 'system',
                content: '用50字概述下面的文章内容',
            },
            {
                role: 'user',
                content: prompt,
            },
        ],
    };

    try {
        const response = await axios.post<ChatGPTResponse>(endpoint, data, { headers });
        const responseData = response.data;

        if (responseData.choices && responseData.choices.length > 0) {
            return responseData.choices[0].message.content;
        } else {
            return 'Error: Failed to generate response';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'Error: Failed to generate response';
    }
}

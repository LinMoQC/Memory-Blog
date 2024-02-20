const OPENAI_API_KEY = 'xxx'; // 替换为你的API密钥
const CHATGPT_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';

async function callChatGPT(prompt:string) {
    try {
        const response = await fetch(CHATGPT_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150, // 生成的最大token数
                temperature: 0.5, // 提供多样化的回答，值越高，回答越随机
            })
        });

        const data = await response.json();
        return data.choices[0].text; // 返回ChatGPT的回答
    } catch (error) {
        console.error('Error calling ChatGPT:', error);
        return 'Uh oh, there was an error. Try again later.';
    }
}

// 使用示例
callChatGPT("Hello, who are you?").then(response => {
    console.log(response); // 输出ChatGPT的回答
});

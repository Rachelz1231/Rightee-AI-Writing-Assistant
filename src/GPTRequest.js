/* Functions for GPT request */
const apiKey = "input your gpt key here";

export async function updateResponseFromOpenAI(prompt) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: prompt,
        max_tokens: 1024,
        temperature: 0.5,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: null
      }),
    });
    const data = await response.json();
    var res = data.choices[0].message.content
    console.log(res)
    return (
      res
    );
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
}
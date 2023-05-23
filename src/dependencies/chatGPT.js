
const axios = require('axios');

const DefPrompt = `You have to research about learning "Forward defense" in the sport of "cricket". Learn from various articles and summarise them to form a content of 300 words. This summary will be stored as content for the parameter "intro_content". Give a title for this introduction and store it as a parameter for "intro_title". Now search the web for "learning straight drive in cricket" and find 2 short YouTube videos. "gpt_vid" will be an array of objects that will have further 2 parameters: "gpt_vid_title" that stores the video title and "gpt_vid_link" that stores "null". Lastly, suggest some articles to refer from and store it in an array "gpt_articles" where the title of the article is stored in "gpt_article_title" and the link of the article is stored in "gpt_article_link". Your response should be in json format as instructed previously.`

const taskPrompt = `A player's forward defense shot in the game of cricket is rated 80 out of 100 by my ai model. Suggest 9 daily task to this player to improve his gameplay.
Your response should be an array of objects. Each object has further two parameters. "taskName" containing the task and "hasChecked" with default value "false". 
Your response should be ONLY in json format`

async function forwardDefData() {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: "text-davinci-003",
        prompt: DefPrompt,
        max_tokens: 700,
        temperature: 0.75,
        n: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        }
      }
    );

    const output = response.data.choices[0].text.trim();
    console.log("output", output);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
} 

async function getTasksGPT() {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: "text-davinci-003",
        prompt: taskPrompt,
        max_tokens: 700,
        temperature: 0.75,
        n: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}}`
        }
      }
    );

    const output = response.data.choices[0].text.trim();
    console.log("output", output);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

getTasksGPT();

module.exports = {getTasksGPT, forwardDefData};
require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY ,
})

const ai = new OpenAIApi(configuration)


const evaluate = async (content) => {
    const evaluate = await ai.createCompletion({
        model: 'text-davinci-002',
        prompt: content,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    let evaluated = evaluate.data.choices[0].text;
    let numbers = evaluated.replace(/\D/g,' z ').match(/\d+/g).length
    let answer = evaluated.replace(/\D/g,' z ').match(/\d+/g)?.[numbers - 1]

    return answer;
}


module.exports = { evaluate }



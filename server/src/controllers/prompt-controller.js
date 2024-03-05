const inputPrompt = require('../models/input-prompts');
const openai = require('../config/openai');

module.exports = {
    async sendText(req, res) {

        const openaiAPI = openai.configuration();
        const inputModel = new inputPrompt(req.body);
        
        try {
            console.log(inputModel);
            console.log(openai.textCompletion(inputModel));
            const response = await openaiAPI.completions.create(
                openai.textCompletion(inputModel)
            );
            console.log(response);
            return res.status(200).json({
                sucess:true,
                data: response.choices[0].text
            })
        } catch (error) {
            console.error(error); // Add this line

            return res.status(400).json({
                sucess:false,
                error: error.response 
                ? error.response.data
                : "There was an issue on the server"
            })
            
        }
    }
}
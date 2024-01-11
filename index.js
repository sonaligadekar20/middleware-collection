import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const checkApi = (req, res, next) => {
    const { apiKey } = req.query;

    if (apiKey==="abc123") {
        // return res.json({
        //     success: true,
        //     message: 'API Key is valid.'
        // })
        next();
    }
    else{
        return res.json({
            success: false,
            message: 'API Key is Invalid.'
        })
    }
}

const validateParams = (req, res, next)=>{
    const {title, description, price} = req.body

    if(!title){
        return res.json({
            success: true,
            message: `title is missing `
        })
    }

    if(!title){
        return res.json({
            success: true,
            message: `title is missing `
        })
    }

    if(!title){
        return res.json({
            success: true,
            message: `title is missing `
        })
    }
}
app.post("/orders", checkApi, async (req, res) => {
    res.json({
        success: true,
        data: [],
        message: 'All orders fetched successfully'
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


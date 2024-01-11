import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
app.use(express.json());

let counter = 0;

const apiCallCounters = (req, res, next)=>{
    counter++;
    console.log(`API calls: ${counter}`)
    next();
}

app.use(apiCallCounters)

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
        return res.status(401).json({
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
            message: `title is missing.`
        })
    }

    if(!description){
        return res.json({
            success: true,
            message: `description is missing.`
        })
    }

    if(!price){
        return res.json({
            success: true,
            message: `price is missing.`
        })
    }
    next();
}
app.post("/orders", checkApi, validateParams, async (req, res) => {
    res.json({
        success: true,
        data: {},
        message: 'Order is created successfully.'
    })
})

app.get("/orders", async(req, res)=>{

    res.json({
        success: true,
        data: [],
        message: 'Orders fetched successfully.'
    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


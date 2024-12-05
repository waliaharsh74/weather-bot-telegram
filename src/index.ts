import express from 'express'
import { connectToDb } from './Db/connection'
import { bot } from './bot'
const app = express();
const port = process.env.PORT
app.use(express.json())
app.get('/alive', (req, res) => {
    console.log('still alive');
    res.json({
        msg: "job working"
    })
})
connectToDb()
bot.launch();


app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})
import * as express from 'express'
import * as bodyParser from 'body-parser'
import productRouter from './Routes/ProductRouter'
import cartRouter  from './Routes/CartRouter'
import  cors from 'cors'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()
const app = express.default()
let flag = false
let IntervalObj:any =null
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use('/products', productRouter)
app.use('/cart',cartRouter)

mongoose
  .connect('mongodb://0.0.0.0:27017/ecom')
  .then(() => {
    console.log('connected to Database')
    flag = true
    clearInterval(IntervalObj)
  })
  .catch((e) => console.log(e))

app.listen(process.env.PORT_NO, () => {
  console.log(`Server running on ${process.env.PORT_NO} ...`)
  if (!flag) {
    IntervalObj =setInterval(() => {
      console.log('Waiting for mongo')
    }, 1000)
  }
})

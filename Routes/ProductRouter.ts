import * as express from 'express'
import {
  getAllProducts,
  getProductById,
  createNewProduct,
  deleteProductById,
  getIdList,
  ToggleWishListed,
} from '../Controllers/ProductController'
import { Request, Response } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
const productRouter = express.Router()

productRouter.get('/', (req, res) => {
  getAllProducts(req, res)
})
productRouter.get('/:id', (req, res) => {
  getProductById(req, res)
})
productRouter.get('/id/list', (req, res) => {
  getIdList(req,res)
})
productRouter.post('/', (req, res) => {
  createNewProduct(req, res)
})
productRouter.put('/:id',(req,res)=>{
  ToggleWishListed(req,res)
})
productRouter.delete('/:id', (req, res) => {
  deleteProductById(req, res)
})

export default productRouter



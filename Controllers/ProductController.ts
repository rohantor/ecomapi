import { Request, Response } from 'express'
import { ProductModel } from '../Models/ProductModel'
export const getAllProducts = (req: Request, res: Response) => {
  ProductModel.find()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => res.send(err))
}
export const getProductById = (req: Request, res: Response) => {
  const { id } = req.params
  ProductModel.find({ id: id })
    .then((data) => {
      if (data.length > 0) {
        res.send(data)
      } else {
        throw `Product of id  ${id} not found `
      }
    })
    .catch((err) => res.send(err))
}
export const createNewProduct = (req: Request, res: Response) => {
  const newProduct = new ProductModel(req.body)
  newProduct
    .save()
    .then((response) => {
      res.send('Product Saved ' + response)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send('Failed Error: ' + err)
    })
}

export const deleteProductById = (req: Request, res: Response) => {
  const { id } = req.params
  ProductModel.deleteOne({ id: id })
    .then(() => {
      console.log('Deleted')
      res.send('Delete')
    })
    .catch((err) => {
      console.log(err)
      res.send('Deleted')
    })
}
export function getIdList(req: Request, res: Response) {
  ProductModel.find({}, { id: 1, _id: 0 }).then((response) => {
    res.send(response)
    console.log(response)
  })
}

export const ToggleWishListed = async (req: Request, res: Response) => {
  const { id } = req.params

  const product = await ProductModel.findOne({ id: id })
  if (product) {
    console.log(product.wishListed)
    product.wishListed = !product.wishListed
    product.save()
  }

  res.send(product)
}

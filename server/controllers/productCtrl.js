import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock
  } = req.body

  const productExists = await Product.findOne({ name })

  if (productExists) {
    res.status(400)
    throw new Error('Product already exists')
  }

  const product = await Product.create({
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    user: req.user._id
  })

  if (product) {
    res.status(201).json(product)
  } else {
    res.status(400)
    throw new Error('Invalid product data')
  }
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = req.body.name || product.name
    product.price = req.body.price || product.price
    product.description = req.body.description || product.description
    product.image = req.body.image || product.image
    product.brand = req.body.brand || product.brand
    product.category = req.body.category || product.category
    product.countInStock = req.body.countInStock || product.countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct
}

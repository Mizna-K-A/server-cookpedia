const express = require('express')
const recipeController = require('../controllers/recipeConrtrollers')
const testimonyController = require('../controllers/testimonyController')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

const router = new express.Router()

// all-recipes
router.get('/all-recipes', recipeController.getAllRecipesController)
// add testimony
router.post('/add-testimony', testimonyController.addTestimonyController)
// register
router.post('/register', userController.registerController)
// register
router.post('/login', userController.loginController)
// view-recipes
router.get('/recipe/:id/view',jwtMiddleware, recipeController.getARecipeController)
// related-recipes
router.get('/related-recipes',jwtMiddleware, recipeController.getRelatedRecipeController)

module.exports = router
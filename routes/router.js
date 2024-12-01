const express = require('express')
const recipeController = require('../controllers/recipeConrtrollers')
const testimonyController = require('../controllers/testimonyController')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const downloadController = require('../controllers/downloadController')
const saveRecipeController = require('../controllers/saveRecipeController')

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
// recipeId
router.post('/recipes/:recipeId/download',jwtMiddleware, downloadController.addRecipetoDownloadController)
// save recipe
router.post('/recipe/save',jwtMiddleware, saveRecipeController.addRecipeToSaveCollectionController)
// all-saved-recipes
router.get('/all-saved-recipes',jwtMiddleware, saveRecipeController.getUserSavedRecipeController)
// remove save recipes
router.delete('/saved-recipe/:id/remove',jwtMiddleware,saveRecipeController.removeSavedRecipeController)
// all-users
router.get('/all-users',jwtMiddleware, userController.getAllUsersController)
// all-downloads
router.get('/all-downloads',jwtMiddleware, downloadController.allDownloadsController)
// all-testimony
router.get('/all-testimony', testimonyController.getAlltestimonyController)
// update-testimony
router.get('/testimony/:id',jwtMiddleware, testimonyController.updateStatusTestimonyController)
// add recipe
router.post('/add-recipe',jwtMiddleware, recipeController.addRecipeController)
// remove recipes
router.delete('/recipe/:id/remove',jwtMiddleware,recipeController.removeRecipeController)
// edit recipe
router.put('/recipe/:id/edit',jwtMiddleware, recipeController.editRecipeController)
// edit user
router.put('/user/edit',jwtMiddleware,userController.editProfileController)

module.exports = router
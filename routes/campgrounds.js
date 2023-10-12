const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')

const { campgroundSchema } = require('../schemas.js');
const ExpressError = require('../utilities/ExpressError');
const Campground = require('../models/campground');

router.get('/', catchAsync(campgrounds.index));

router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

router.get('/:id', catchAsync(campgrounds.showCampground));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

router.delete('/:id', isAuthor, isLoggedIn, catchAsync(campgrounds.deleteCampground));

module.exports = router;
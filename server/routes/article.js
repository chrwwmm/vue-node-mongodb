var express = require('express');
var mongoose = require('mongoose'); //导入mongoose模块
var router = express.Router();
var ArticleModel = require('../models/article'); //导入模型数据模块

router.get('/type/all', ArticleModel.readAll);//找出所有栏目

router.get('/add', ArticleModel.addData);//新增栏目

router.get('/modify', ArticleModel.modifyData);//修改栏目名称

router.get('/del', ArticleModel.delData);//删除栏目


module.exports = router;
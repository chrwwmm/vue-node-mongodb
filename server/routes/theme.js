var express = require('express');
var mongoose = require('mongoose'); //导入mongoose模块
var router = express.Router();
var ThemeModel = require('../models/theme'); //导入模型数据模块

router.get('/type/all', ThemeModel.readAll);//找出所有栏目

router.get('/add', ThemeModel.addData);//新增栏目

router.get('/modify', ThemeModel.modifyData);//修改栏目名称

router.get('/del', ThemeModel.delData);//删除栏目


module.exports = router;

var express = require('express');
var mongoose = require('mongoose'); //导入mongoose模块
var router = express.Router();
var TopModel = require('../models/top'); //导入模型数据模块

router.get('/type/all', TopModel.readAll);//找出所有latest

router.get('/add', TopModel.addData);//新增top

router.get('/modify', TopModel.modifyData);//修改top名称

router.get('/del', TopModel.delData);//删除top

router.post('/upload', TopModel.uploadFile);//上传文件

module.exports = router;

var express = require('express');
var mongoose = require('mongoose'); //导入mongoose模块
var router = express.Router();
var LatestModel = require('../models/latest'); //导入模型数据模块

router.get('/type/all', LatestModel.readAll);//找出所有latest

//router.get('/add', LatestModel.addData);//新增latest
//
//router.get('/modify', LatestModel.modifyData);//修改latest名称
//
//router.get('/del', LatestModel.delData);//删除latest

router.post('/upload', LatestModel.uploadFile);//上传文件

module.exports = router;

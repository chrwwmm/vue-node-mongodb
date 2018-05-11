var express = require('express');
var mongoose = require('mongoose'); //导入mongoose模块
var router = express.Router();
var StoriesModel = require('../models/stories'); //导入模型数据模块

router.get('/type/all', StoriesModel.readAll);//找出所有stories

router.get('/add', StoriesModel.addData);//新增stories

router.get('/modify', StoriesModel.modifyData);//修改stories名称

router.get('/del', StoriesModel.delData);//删除stories

router.post('/upload', StoriesModel.uploadFile);//上传文件

module.exports = router;

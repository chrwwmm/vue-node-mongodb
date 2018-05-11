var mongoose = require('mongoose')
var TopSchema = require('../schemas/top') //拿到导出的数据集模块
var Top = mongoose.model('Top', TopSchema) // 编译生成模型
var uploadfile = require('./upload') //上传文件模块
var config = require('config-lite');

module.exports = {
	readAll: function(req, res, next) {
		Top.find()
//			.populate('news', 'imageUrl title')
			.exec(function(err, data) {
				if(err) {
					next(err);
				}
				
				return res.status(200).json({
					result: data,
					msg: "成功",
					code: 0
				});
			});
	},
	addData: function(req, res, next) { //新增
		let doc = {imageUrl : req.query.imageUrl, title : req.query.title};
		Top.create(doc,function(error){
		    if(error) {
		        console.log(error);
		    } else {
		        console.log('add ok');
		        return res.status(200).json({ //添加return后才能在前端执行 this.getaPage(); 刷新页面数据
					result: null,
					msg: '保存成功',
					code: 0
				});
		    }
		});
	},
	delData: function(req, res, next) { //删除latest
		// 要删除的条件
		let del = { _id: req.query.id };
		Top.findOne(del, function(err, result) {
			if(err) {
				return next(err);
			}
			if(!result) {
				return res.status(200).json({
					result: null,
					msg: '删除失败，不存在该类别',
					code: 1
				});
			} else {
				Top.remove(del, function(err, result) {
					if(err) {
						return next(err);
					} else {
						return res.status(200).json({
							result: result,
							msg: "删除成功",
							code: 0
						});
					}
				})
			}
		});
	},	
	modifyData: function(req, res, next) { //修改latest
		// 要修改的条件
		let doc = { id: req.query._id };
		let id = mongoose.Types.ObjectId(doc.id);
		Top.findOne({_id: id},  function(err, result) {
			if(err) {
				return next(err);
			}
			if(!result) {
				return res.status(200).json({
					result: null,
					msg: '修改失败，不存在该类别',
					code: 1
				});
			} else {
				let oldValue = { _id: id};
				// 单条件更新
				let newData = {
					$set: {
						imageUrl: req.query.imageUrl, title: req.query.title
					}
				};
				Top.update(oldValue, newData, function(err, result) {
					if(err) {
						return next(err);
					} else {
						return res.status(200).json({
							result: result,
							msg: "修改成功",
							code: 0
						});
					}
				})
			}
		});
	},
	
	uploadFile: function(req, res, next) {
		console.log(req.body);
  		console.log(req.files);
		function callback(uploadFolderName, fileName) {
			return res.status(200).json({
//				result: config.server + uploadFolderName + '/' + fileName,
				result: fileName,
				msg: "上传成功",
				code: 0
			});
		}
		uploadfile.upload(req, res, next, callback);
	}
	  
};

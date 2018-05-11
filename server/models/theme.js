var mongoose = require('mongoose')
var ThemeSchema = require('../schemas/theme') //拿到导出的数据集模块
var Theme = mongoose.model('Theme', ThemeSchema) // 编译生成模型
var ArticleSchema = require('../schemas/article') //拿到导出的数据集模块
var Article = mongoose.model('Article', ArticleSchema) // 编译生成模型


module.exports = {
	readAll: function(req, res, next) {
		Theme.find({
				status: {
					$ne: "1"
				}
			})
			.sort('meta.updateAt') //排序
			.populate('list', '_id title author type')
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
	addData: function(req, res, next) { //新增栏目
		let doc = {name : req.query.name, url : req.query.url, intro : req.query.intro};
		Theme.create(doc, function(error){
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
	delData: function(req, res, next) { //删除theme
		// 要删除的条件
		let del = { _id: req.query.id };
		Theme.findOne(del, function(err, result) {
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
				Theme.remove(del, function(err, result) {
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
	
	modifyData: function(req, res, next) { //修改theme
		// 要修改的条件
		let doc = { id: req.query._id };
		let id = mongoose.Types.ObjectId(doc.id);
		Theme.findOne({_id: id},  function(err, result) {
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
						name: req.query.name, url: req.query.url, intro: req.query.intro
					}
				};
				Theme.update(oldValue, newData, function(err, result) {
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
//	addData: function(req, res, next) {
//
//	    var lanmu = new Lanmu({name : 'lanmu', url : 'lanmu-url', intro : 'lanmu-intro'});
//		lanmu.save(function(error){
//		    if(error) {
//		        console.log(error);
//		    } else {
//		        console.log('save ok');
//		    }
//		});
//	}
	  
};

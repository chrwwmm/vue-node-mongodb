var mongoose = require('mongoose')
var ArticleSchema = require('../schemas/article') //拿到导出的数据集模块
var Article = mongoose.model('Article', ArticleSchema) // 编译生成模型
var ThemeSchema = require('../schemas/theme') //拿到导出的数据集模块
var Theme = mongoose.model('Theme', ThemeSchema) // 编译生成模型


module.exports = {
	readAll: function(req, res, next) {
		let doc = {
			page : req.query.page
		};
		Article.find()
			.skip((doc.page-1)*5)
			.limit(5) //分页
			.sort('meta.updateAt') //排序
			.populate('type', '_id name url intro') //关联表字段
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
	
	addData: function(req, res, next) { //新增article
		let doc = {
			title : req.query.title, 
			author : req.query.author, 
			type : req.query.type, 
			intro : req.query.intro, 
			content : req.query.content
		};
		
		var node = new Article(doc);		
		node.save(function(error){
		    if(error) {
		        console.log(error);
		    } 	
	    	let oldValue = { _id: doc.type};
			// 单条件更新
			let newData = { $addToSet: {'list': node._id} };
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
		        
		});
		
	},
	
	delData: function(req, res, next) { //删除article
		// 要删除的条件
		let del = { _id: req.query.id };
		Article.findOne(del, function(err, result) {
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
				Article.remove(del, function(err, result) {
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
	
	modifyData: function(req, res, next) { //修改article
		// 要修改的条件
		let doc = { 
			id: req.query.id,
			title: req.query.title, 
			author: req.query.author, 
			type : req.query.type, 
			intro: req.query.intro, 
			content: req.query.content
		};
		let id = mongoose.Types.ObjectId(doc.id);
		Article.findOne({_id: id},  function(err, result) {
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
						title: doc.title, 
						author: doc.author, 
						type : doc.type, 
						intro: doc.intro, 
						content: doc.content
					}
				};
				// 修改article
				Article.update(oldValue, newData, function(err, result) {
					if(err) {
						return next(err);
					} 
					// 删除字段list中包含有此article的_id的一条记录
					Theme.update({list: doc.id}, {'$pull': {'list': doc.id}}, {multi: true}, function(err, result) {
						if(err) {
							return next(err);
						}
						//向当前选中Theme的list中添加一条记录
						Theme.update({_id: doc.type}, {'$addToSet': {'list': doc.id}}, {multi: true},function(err, result) {
							if(err) {
								return next(err);
							}
							return res.status(200).json({
								result: result,
								msg: '保存成功',
								code: 0
							});
						});
					})
				})
			}
		});
	}
};

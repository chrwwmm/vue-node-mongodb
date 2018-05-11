var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*定义模式Lanmu_Schema*/
var ArticleSchema = new Schema({
	title:String,
	author:String,
	type: {
		type: Schema.ObjectId,
		ref: 'Theme'
	},
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	},
	intro:String,
	content:String
});

//暴露出去的方法
module.exports = ArticleSchema;
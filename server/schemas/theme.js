var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*定义模式Theme_Schema*/
var ThemeSchema = new Schema({
	name:String,
	url:String,
	intro:String,
	list: [{
		type: Schema.ObjectId,
		ref: 'Article'
	}],
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

//暴露出去的方法
module.exports = ThemeSchema;
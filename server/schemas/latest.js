var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*定义模式LatestSchema*/
var LatestSchema = new Schema({
//	imageUrl: String, 
//	title: String,
	stories:[{ 
		type: Schema.ObjectId,
		ref: 'Stories'
	}],
	top:[{ 
		type: Schema.ObjectId,
		ref: 'Top'
	}]
});

//暴露出去的方法
module.exports = LatestSchema;



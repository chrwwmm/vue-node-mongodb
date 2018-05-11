var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*定义模式LatestSchema*/
var StoriesSchema = new Schema({
	imageUrl: String, 
	title: String
});

//暴露出去的方法
module.exports = StoriesSchema;



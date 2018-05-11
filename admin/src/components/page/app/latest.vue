<template>
	<div class="main">
		<div class="table">
	        <div class="crumbs">
	            <el-breadcrumb separator="/">
	                <el-breadcrumb-item><i class="el-icon-menu"></i> app</el-breadcrumb-item>
	                <el-breadcrumb-item>latest</el-breadcrumb-item>
	            </el-breadcrumb>
	        </div>
	        <div class="stories">
	        	<div class="handle-box">
		        	<el-button type="primary" icon="edit" class="handle-add mr10" @click="storiesAdd">添加latest</el-button>
		            <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>         
		        </div>
		        <div class="stories-main">
		        	<el-table :data="astories" highlight-current-row border style="width: 100%" ref="multipleTable">
			            <el-table-column type="selection" width="80"></el-table-column>
						<el-table-column type="index" width="100"></el-table-column>
						<el-table-column prop="imageUrl" label="图片" width="180"></el-table-column>
						<el-table-column prop="title" label="标题" min-width="280"></el-table-column>
			            <el-table-column label="操作" width="180">
			                <template scope="scope">
			                    <el-button size="small"
			                            @click="storiesEdit(scope.$index, scope.row)">编辑</el-button>
			                    <el-button size="small" type="danger"
			                            @click="storiesDel(scope.$index, scope.row)">删除</el-button>
			                </template>
			            </el-table-column>
			        </el-table>
		        </div>
		        
		        <!--工具条-->
				<el-col class="pagination">
		            <el-pagination
		                    @current-change ="handleCurrentChange"
		                    layout="prev, pager, next"
		                    :total="50">
		            </el-pagination>
				</el-col>
	        </div>
	        
			
	       	<!--top-->
	       	<div class="module-crumbs">
		        <el-breadcrumb separator="/">
		        	<el-breadcrumb-item>top</el-breadcrumb-item>
		        </el-breadcrumb>
	        </div>
	        <div class="handle-box">
	        	<el-button type="primary" icon="edit" class="handle-add mr10" @click="topAdd">添加top</el-button>       
	        </div>
	        <el-table :data="atop" highlight-current-row border style="width: 100%" ref="multipleTable">
				<el-table-column type="index" width="80"></el-table-column>
				<el-table-column prop="imageUrl" label="图片" width="280"></el-table-column>
				<el-table-column prop="title" label="标题" min-width="280"></el-table-column>
	            <el-table-column label="操作" width="180">
	                <template scope="scope">
	                    <el-button size="small"
	                            @click="topEdit(scope.$index, scope.row)">编辑</el-button>
	                    <el-button size="small" type="danger"
	                            @click="topDel(scope.$index, scope.row)">删除</el-button>
	                </template>
	            </el-table-column>
	        </el-table>
		</div>
    	   	
    	<!--stories编辑界面-->
		<el-dialog title="编辑stories" v-model="editStoriesVisible">
			<el-form :model="editStories" label-width="80px">
				<el-form-item label="上传图片">
					<el-upload
					  	action="http://localhost:3101/latest/upload"
					  	list-type="picture-card"
					  	:on-remove="handleRemove"
					  	:on-success="uploadstorieseditSuccess">
					  	<i class="el-icon-plus"></i>
					</el-upload>
					<img width="150px" :src="'http://localhost:3101/upload/' + editStories.imageUrl" alt="">
				</el-form-item>	
				<el-form-item label="标题" prop="title">
					<el-input v-model="editStories.title"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editStoriesVisible = false">取消</el-button>
				<el-button type="primary" @click="editaStoriesSubmit">提交</el-button>
			</div>
		</el-dialog>
		
		<!--top编辑界面-->
		<el-dialog title="编辑top" v-model="editTopVisible">
			<el-form :model="editTop" label-width="80px">
				<el-form-item label="上传图片">
					<el-upload
					  	action="http://localhost:3101/latest/upload"
					  	list-type="picture-card"
					  	:on-remove="handleRemove"
					  	:on-success="uploadtopeditSuccess">
					  	<i class="el-icon-plus"></i>
					</el-upload>
					<img width="150px" :src="'http://localhost:3101/upload/' + editTop.imageUrl" alt="">
				</el-form-item>	
				<el-form-item label="标题" prop="title">
					<el-input v-model="editTop.title"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editTopVisible = false">取消</el-button>
				<el-button type="primary" @click="editaTopSubmit">提交</el-button>
			</div>
		</el-dialog>
		
	    <!--stories新增界面-->
		<el-dialog title="新增stories" v-model="addStoriesVisible">
			<el-form :model="addStories" label-width="80px">
				<el-form-item label="上传图片">
					<el-upload
					  	action="http://localhost:3101/latest/upload"
					  	list-type="picture-card"
					  	:on-remove="handleRemove"
					  	:on-success="uploadstoriesaddSuccess">
					  	<i class="el-icon-plus"></i>
					</el-upload>
					<!--<img width="150px" :src="'http://localhost/api/uploads/' + addNews.imageUrl" alt="">-->
				</el-form-item>	
				<el-form-item label="标题" prop="title">
					<el-input v-model="addStories.title"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addStoriesVisible = false">取消</el-button>
				<el-button type="primary" @click="addaStoriesSubmit">提交</el-button>
			</div>
		</el-dialog>
		
		<!--top新增界面-->
		<el-dialog title="新增top" v-model="addTopVisible">
			<el-form :model="addTop" label-width="80px">
				<el-form-item label="上传图片">
					<el-upload
					  	action="http://localhost:3101/latest/upload"
					  	list-type="picture-card"
					  	:on-remove="handleRemove"
					  	:on-success="uploadtopaddSuccess">
					  	<i class="el-icon-plus"></i>
					</el-upload>
					<!--<img width="150px" :src="'http://localhost/api/uploads/' + addTop.imageUrl" alt="">-->
				</el-form-item>	
				<el-form-item label="标题" prop="title">
					<el-input v-model="addTop.title"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addTopVisible = false">取消</el-button>
				<el-button type="primary" @click="addaTopSubmit">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { getaLatest,addaLatest,editaLatest,delaLatest,getaStories,addaStories,editaStories,delaStories,getaTop,addaTop,editaTop,delaTop } from '../../../api/api';
    export default {
        data() {
            return {
            	addStoriesVisible: false,//新增界面是否显示
            	addTopVisible: false,//新增top界面是否显示
            	editStoriesVisible: false,//编辑界面是否显示
            	editTopVisible: false,//编辑模块界面是否显示
            	
          		// upload
        		dialogVisible: false,
        		
            	alatest:[],
            	astories:[],
            	atop:[],
            	
            	multipleSelection: [],
            	cur_page: 1,
            	//编辑界面数据
				editStories: {
					imageUrl: '',
					title:''
				},
				//编辑模块界面数据
				editTop: {
					imageUrl: '',
					title:''
				},
            	//新增界面数据
				addStories: {
					imageUrl: '',
					title:''
				},
				//新增top界面数据
				addTop: {
					imageUrl: '',
					title:''
				}
            }
        },
        created(){
        	this.getaLatest();
            this.getaStories();
            this.getaTop();
        },
        methods: {
        	handleCurrentChange(val){
                this.cur_page = val;
                this.getaStories();
            },
        	//显示新增界面
			storiesAdd: function () {
				this.addStoriesVisible = true;
			},
			//编辑
			storiesEdit: function (index, row) {
				this.editStoriesVisible = true;
				this.editStories = Object.assign({}, row);
			},
			
			//新增top界面
			topAdd: function () {
				this.addTopVisible = true;
			},
			//新增top提交
			addaTopSubmit: function () {
				let addImage = this.addTop.imageUrl;
				let addTitle = this.addTop.title;
				if (addImage===''||addTitle==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = { imageUrl: addImage,title:addTitle }; 
						console.log(para.title)
						addaTop(para).then((res) => {
							this.$message({
								message: '添加成功',
								type: 'success'
							});	
							this.getaTop();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.addTopVisible = false;					
				}
			},
			//编辑top
			topEdit: function (index, row) {
				this.editTopVisible = true;
				this.editTop = Object.assign({}, row);
			},
			//删除top
			topDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let rid= row._id;
					console.log(rid);
					let para = { id: rid };
					delaTop(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getaTop();
					});
				}).catch(() => {

				});
			},
			//删除模块
			storiesDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let rid= row._id;
					console.log(rid);
					let para = { id: rid };
					delaStories(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getaStories();
					});
				}).catch(() => {

				});
			},
			//编辑news提交
			editaStoriesSubmit: function () {
				let editImg = this.editStories.imageUrl;
				let editTitle = this.editStories.title;
				if (editImg===''||editTitle==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.editStories);
//						console.log(para.name)
						editaStories(para).then((res) => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});	
							this.getaStories();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.editStoriesVisible = false;					
				}
			},
			//编辑top提交
			editaTopSubmit: function () {
				let editId = this.editTop.id;
				let editImg = this.editTop.imageUrl;
				let editTitle = this.editTop.title;
				if (editId===''||editImg===''||editTitle==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.editTop);
//						console.log(para.name)
						editaTop(para).then((res) => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});	
							this.getaTop();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.editTopVisible = false;					
				}
			},
			//新增news
			addaStoriesSubmit: function () {
				let addImage = this.addStories.imageUrl;
				let addTitle = this.addStories.title;
				if (addImage===''||addTitle==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = { imageUrl: addImage,title:addTitle }; 
						console.log(para.title)
						addaStories(para).then((res) => {
							this.$message({
								message: '添加成功',
								type: 'success'
							});	
							this.getaStories();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.addStoriesVisible = false;					
				}
			},
			getaLatest(){
				getaLatest().then((res) => {
					this.alatest = res.data.result;
				});
            },
            getaStories(){
          		let para = { page:this.cur_page };
				getaStories(para).then((res) => {
					this.astories = res.data.result;
				});
            },
            getaTop(){
				getaTop().then((res) => {
					this.atop = res.data.result;
				});
            },
            //批量删除
			delAll(){

          	},
          	handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    uploadstorieseditSuccess(res,file, fileList){
		    	console.log(res);
		    	console.log(file.name);
		    	this.editStories.imageUrl = res.result
		    },
		    uploadstoriesaddSuccess(res,file, fileList){
		    	console.log(res);
		    	console.log(file.name);
		    	this.addStories.imageUrl = res.result
		    },
		    uploadtopeditSuccess(res,file, fileList){
		    	console.log(res);
		    	console.log(file.name);
		    	this.editTop.imageUrl = res.result
		    },
		    uploadtopaddSuccess(res,file, fileList){
		    	console.log(res);
		    	console.log(file.name);
		    	this.addTop.imageUrl = res.result
		    }
          		    
        }
    }
</script>

<style scoped>
.stories-main{min-height: 260px;}
.handle-box{margin-bottom: 20px;}
.module-crumbs{margin-top: 20px;margin-bottom: 20px;}
</style>
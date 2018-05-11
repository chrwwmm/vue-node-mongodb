<template>
	<div class="main">
		<div class="table">
	        <div class="crumbs">
	            <el-breadcrumb separator="/">
	                <el-breadcrumb-item><i class="el-icon-menu"></i> myapp</el-breadcrumb-item>
	                <el-breadcrumb-item>m-新闻中心</el-breadcrumb-item>
	            </el-breadcrumb>
	        </div>
	        <div class="lanmu">
	        	<div class="handle-box">
		        	<el-button type="primary" icon="edit" class="handle-add mr10" @click="newsAdd">添加news</el-button>
		            <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>         
		        </div>
		        <div class="lanmu-main">
		        	<el-table :data="mnews" highlight-current-row border style="width: 100%" ref="multipleTable">
			            <el-table-column type="selection" width="80"></el-table-column>
						<el-table-column type="index" width="100"></el-table-column>
						<el-table-column prop="id" label="ID" width="100" sortable></el-table-column>
						<el-table-column prop="imageUrl" label="图片" width="180"></el-table-column>
						<el-table-column prop="title" label="标题" min-width="280"></el-table-column>
			            <el-table-column label="操作" width="180">
			                <template scope="scope">
			                    <el-button size="small"
			                            @click="newsEdit(scope.$index, scope.row)">编辑</el-button>
			                    <el-button size="small" type="danger"
			                            @click="newsDel(scope.$index, scope.row)">删除</el-button>
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
	        <el-table :data="mtop" highlight-current-row border style="width: 100%" ref="multipleTable">
				<el-table-column type="index" width="80"></el-table-column>
				<el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
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
    	   	
    	<!--news编辑界面-->
		<el-dialog title="编辑news" v-model="editNewsVisible">
			<el-form :model="editNews" label-width="80px">
				<el-form-item label="ID" prop="id">
					<el-input v-model="editNews.id"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
					<el-upload
					  	action="http://localhost/api/vue-admin/upload.php"
					  	list-type="picture-card"
					  	:on-remove="handleRemove"
					  	:on-success="uploadnewseditSuccess">
					  	<i class="el-icon-plus"></i>
					</el-upload>
					<img width="150px" :src="'http://localhost/api/uploads/' + editNews.imageUrl" alt="">
				</el-form-item>	
				<el-form-item label="标题" prop="title">
					<el-input v-model="editNews.title"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editNewsVisible = false">取消</el-button>
				<el-button type="primary" @click="editmNewsSubmit">提交</el-button>
			</div>
		</el-dialog>
		
		<!--top编辑界面-->
		<el-dialog title="编辑top" v-model="editTopVisible">
			<el-form :model="editTop" label-width="80px">
				<el-form-item label="ID" prop="id">
					<el-input v-model="editTop.id"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
					<el-upload
					  	action="http://localhost/api/vue-admin/upload.php"
					  	list-type="picture-card"
					  	:on-remove="handleRemove"
					  	:on-success="uploadtopeditSuccess">
					  	<i class="el-icon-plus"></i>
					</el-upload>
					<img width="150px" :src="'http://localhost/api/uploads/' + editTop.imageUrl" alt="">
				</el-form-item>	
				<el-form-item label="标题" prop="title">
					<el-input v-model="editTop.title"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editTopVisible = false">取消</el-button>
				<el-button type="primary" @click="editmTopSubmit">提交</el-button>
			</div>
		</el-dialog>
		
	    <!--news新增界面-->
		<el-dialog title="新增news" v-model="addNewsVisible">
			<el-form :model="addNews" label-width="80px">
				<el-form-item label="ID" prop="id">
					<el-input v-model="addNews.id"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
					<el-upload
					  	action="http://localhost/api/vue-admin/upload.php"
					  	list-type="picture-card"
					  	:on-remove="handleRemove"
					  	:on-success="uploadnewsaddSuccess">
					  	<i class="el-icon-plus"></i>
					</el-upload>
					<!--<img width="150px" :src="'http://localhost/api/uploads/' + addNews.imageUrl" alt="">-->
				</el-form-item>	
				<el-form-item label="标题" prop="title">
					<el-input v-model="addNews.title"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addNewsVisible = false">取消</el-button>
				<el-button type="primary" @click="addmNewsSubmit">提交</el-button>
			</div>
		</el-dialog>
		
		<!--top新增界面-->
		<el-dialog title="新增top" v-model="addTopVisible">
			<el-form :model="addTop" label-width="80px">
				<el-form-item label="ID" prop="id">
					<el-input v-model="addTop.id"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
					<el-upload
					  	action="http://localhost/api/vue-admin/upload.php"
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
				<el-button type="primary" @click="addmTopSubmit">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { delLanmu,addLanmu,editLanmu,getPage,getModule,editModule,delModule,getmTop,addmTop,editmTop,delmTop,getmNews,addmNews,editmNews,delmNews } from '../../../api/api';
    export default {
        data() {
            return {
            	addNewsVisible: false,//新增界面是否显示
            	addTopVisible: false,//新增top界面是否显示
            	editNewsVisible: false,//编辑界面是否显示
            	editTopVisible: false,//编辑模块界面是否显示
            	
          		// upload
        		dialogVisible: false,
        		
            	lanmu:[],
            	mtop:[],
            	mnews:[],
            	multipleSelection: [],
            	cur_page: 1,
            	//编辑界面数据
				editNews: {
					id: 0,
					imageUrl: '',
					title:''
				},
				//编辑模块界面数据
				editTop: {
					id: 0,
					imageUrl: '',
					title:''
				},
            	//新增界面数据
				addNews: {
					id: '',
					imageUrl: '',
					title:''
				},
				//新增top界面数据
				addTop: {
					id: '',
					imageUrl: '',
					title:''
				}
            }
        },
        created(){
            this.getmNews();
            this.getmTop();
        },
        methods: {
        	handleCurrentChange(val){
                this.cur_page = val;
                this.getmNews();
            },
        	//显示新增界面
			newsAdd: function () {
				this.addNewsVisible = true;
			},
			//编辑
			newsEdit: function (index, row) {
				this.editNewsVisible = true;
				this.editNews = Object.assign({}, row);
			},
			
			//新增top界面
			topAdd: function () {
				this.addTopVisible = true;
			},
			//新增top提交
			addmTopSubmit: function () {
				let addId = this.addTop.id;
				let addImage = this.addTop.imageUrl;
				let addTitle = this.addTop.title;
				if (addId===''||addImage===''||addTitle==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = { id:addId,imageUrl: addImage,title:addTitle }; 
						console.log(para.id)
						addmTop(para).then((res) => {
							this.$message({
								message: '添加成功',
								type: 'success'
							});	
							this.getmTop();
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
					let para = { id: row.id };
					delmTop(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getmTop();
					});
				}).catch(() => {

				});
			},
			//删除模块
			newsDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let para = { id: row.id };
					delmNews(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getmNews();
					});
				}).catch(() => {

				});
			},
			//编辑news提交
			editmNewsSubmit: function () {
				let editId = this.editNews.id;
				let editImg = this.editNews.imageUrl;
				let editTitle = this.editNews.title;
				if (editId===''||editImg===''||editTitle==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.editNews);
//						console.log(para.name)
						editmNews(para).then((res) => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});	
							this.getmNews();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.editNewsVisible = false;					
				}
			},
			//编辑top提交
			editmTopSubmit: function () {
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
						editmTop(para).then((res) => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});	
							this.getmTop();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.editTopVisible = false;					
				}
			},
			//新增news
			addmNewsSubmit: function () {
				let addId = this.addNews.id;
				let addImage = this.addNews.imageUrl;
				let addTitle = this.addNews.title;
				if (addId===''||addImage===''||addTitle==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = { id:addId,imageUrl: addImage,title:addTitle }; 
						console.log(para.id)
						addmNews(para).then((res) => {
							this.$message({
								message: '添加成功',
								type: 'success'
							});	
							this.getmNews();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.addNewsVisible = false;					
				}
			},
            getmNews(){
            	let para = { page:this.cur_page };
				getmNews(para).then((res) => {
					this.mnews = res.data;
				});
            },
            getmTop(){
				getmTop().then((res) => {
					this.mtop = res.data;
				});
            },
            //批量删除
			delAll(){

          	},
          	handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    uploadnewseditSuccess(res,file, fileList){
		    	console.log(res);
		    	console.log(file.name);
		    	this.editNews.imageUrl = file.name
		    },
		    uploadnewsaddSuccess(res,file, fileList){
		    	console.log(res);
		    	console.log(file.name);
		    	this.addNews.imageUrl = file.name
		    },
		    uploadtopeditSuccess(res,file, fileList){
		    	console.log(res);
		    	console.log(file.name);
		    	this.editTop.imageUrl = file.name
		    },
		    uploadtopaddSuccess(res,file, fileList){
		    	console.log(res);
		    	console.log(file.name);
		    	this.addTop.imageUrl = file.name
		    }
          		    
        }
    }
</script>

<style scoped>
.lanmu-main{min-height: 260px;}
.handle-box{margin-bottom: 20px;}
.module-crumbs{margin-top: 20px;margin-bottom: 20px;}
</style>
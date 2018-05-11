<template>
	<div class="main">
		<div class="table">
	        <div class="crumbs">
	            <el-breadcrumb separator="/">
	                <el-breadcrumb-item><i class="el-icon-menu"></i> 亿慧云</el-breadcrumb-item>
	                <el-breadcrumb-item>首页</el-breadcrumb-item>
	            </el-breadcrumb>
	        </div>
	        <div class="lanmu">
	        	<div class="handle-box">
		        	<el-button type="primary" icon="edit" class="handle-add mr10" @click="handleAdd">添加栏目</el-button>
		            <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>         
		        </div>
		        <div class="lanmu-main">
		        	<el-table :data="lanmu" highlight-current-row border style="width: 100%" ref="multipleTable">
			            <el-table-column type="selection" width="80"></el-table-column>
						<el-table-column type="index" width="100"></el-table-column>
						<el-table-column prop="id" label="ID" width="100" sortable></el-table-column>
						<el-table-column prop="name" label="栏目名称" width="180"></el-table-column>
						<el-table-column prop="url" label="url" min-width="280"></el-table-column>
			            <el-table-column label="操作" width="180">
			                <template scope="scope">
			                    <el-button size="small"
			                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			                    <el-button size="small" type="danger"
			                            @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
	        
			
	       	<!--模块-->
	       	<div class="module-crumbs">
		        <el-breadcrumb separator="/">
		        	<el-breadcrumb-item>模块</el-breadcrumb-item>
		        </el-breadcrumb>
	        </div>
	        <el-table :data="module" highlight-current-row border style="width: 100%" ref="multipleTable">
				<el-table-column type="index" width="80"></el-table-column>
				<el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
				<el-table-column prop="name" label="模块名称" width="120"></el-table-column>
				<el-table-column prop="url" label="url" min-width="120"></el-table-column>
				<el-table-column prop="imageUrl" label="imageUrl" min-width="180"></el-table-column>
				<el-table-column prop="intro" label="intro" min-width="180"></el-table-column>
	            <el-table-column label="操作" width="180">
	                <template scope="scope">
	                    <el-button size="small"
	                            @click="moduleEdit(scope.$index, scope.row)">编辑</el-button>
	                    <el-button size="small" type="danger"
	                            @click="moduleDel(scope.$index, scope.row)">删除</el-button>
	                </template>
	            </el-table-column>
	        </el-table>
		</div>
    	   	
    	<!--编辑界面-->
		<el-dialog title="编辑栏目" v-model="editFormVisible">
			<el-form :model="editForm" label-width="80px">
				<el-form-item label="栏目名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="url" prop="url">
					<el-input v-model="editForm.url"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit">提交</el-button>
			</div>
		</el-dialog>
		
		<!--模块编辑界面-->
		<el-dialog title="编辑模块" v-model="editModuleVisible">
			<el-form :model="editModule" label-width="80px">
				<el-form-item label="模块名称" prop="name">
					<el-input v-model="editModule.name"></el-input>
				</el-form-item>
				<el-form-item label="url" prop="url">
					<el-input v-model="editModule.url"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
					<el-upload
					  	action="http://localhost/api/vue-admin/upload.php"
					  	list-type="picture-card"
					  	:on-remove="handleRemove"
					  	:on-success="uploadSuccess">
					  	<i class="el-icon-plus"></i>
					</el-upload>
					<img width="150px" :src="'http://localhost/api/uploads/' + editModule.imageUrl" alt="">
				</el-form-item>	
				<el-form-item label="intro" prop="intro">
					<el-input v-model="editModule.intro"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModuleVisible = false">取消</el-button>
				<el-button type="primary" @click="editModuleSubmit">提交</el-button>
			</div>
		</el-dialog>
		
	    <!--新增界面-->
		<el-dialog title="添加栏目" v-model="addFormVisible">
			<el-form :model="addForm" label-width="80px">
				<el-form-item label="ID" prop="id">
					<el-input v-model="addForm.id"></el-input>
				</el-form-item>
				<el-form-item label="栏目名称" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="url" prop="url">
					<el-input v-model="addForm.url"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click="addSubmit">提交</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { delLanmu,addLanmu,editLanmu,getPage,getModule,editModule,delModule } from '../../../api/api';
    export default {
        data() {
            return {
            	addFormVisible: false,//新增界面是否显示
            	editFormVisible: false,//编辑界面是否显示
            	editModuleVisible: false,//编辑模块界面是否显示
            	
          		// upload
        		dialogVisible: false,
        		
            	lanmu:[],
            	module:[],
            	multipleSelection: [],
            	cur_page: 1,
            	//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					url:''
				},
				//编辑模块界面数据
				editModule: {
					id: 0,
					name: '',
					url: '',
					imageUrl: '',
					intro:''
				},
            	//新增界面数据
				addForm: {
					id: '',
					name: '',
					url:''
				}
            }
        },
        created(){
            this.getPage();
            this.getModule();
        },
        methods: {
        	handleCurrentChange(val){
                this.cur_page = val;
                this.getPage();
            },
        	//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
			},
			//编辑
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//编辑模块
			moduleEdit: function (index, row) {
				this.editModuleVisible = true;
				this.editModule = Object.assign({}, row);
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let para = { id: row.id };
					delLanmu(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getPage();
					});
				}).catch(() => {

				});
			},
			//删除模块
			moduleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let para = { id: row.id };
					delModule(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getModule();
					});
				}).catch(() => {

				});
			},
			//编辑提交
			editSubmit: function () {
				let editName = this.editForm.name;
				let editUrl = this.editForm.url;
				if (editName===''||editUrl==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.editForm);
						console.log(para.name)
						editLanmu(para).then((res) => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});	
							this.getPage();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.editFormVisible = false;					
				}
			},
			//编辑模块提交
			editModuleSubmit: function () {
				let editName = this.editModule.name;
				let editUrl = this.editModule.url;
				let editImg = this.editModule.imageUrl;
				let editIntro = this.editModule.intro;
				if (editName===''||editUrl===''||editImg===''||editIntro==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.editModule);
//						console.log(para.name)
						editModule(para).then((res) => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});	
							this.getModule();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.editModuleVisible = false;					
				}
			},
			//新增
			addSubmit: function () {
				let addId = this.addForm.id;
				let addName = this.addForm.name;
				let addUrl = this.addForm.url;
				if (addId===''||addName===''||addUrl==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = { id:addId,name: addName,url:addUrl }; //这里为什么写成 let para = { name: this.addName }; 时， addLanmu.php报错:name为undefined
						console.log(para.id)
						addLanmu(para).then((res) => {
							this.$message({
								message: '添加成功',
								type: 'success'
							});	
							this.getPage();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.addFormVisible = false;					
				}
			},
            getPage(){
            	let para = { page:this.cur_page };
				getPage(para).then((res) => {
					this.lanmu = res.data;
				});
            },
            getModule(){
				getModule().then((res) => {
					this.module = res.data;
				});
            },
            //批量删除
			delAll(){

          	},
          	handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    uploadSuccess(res,file, fileList){
		    	console.log(res);
		    	console.log(file.name);
		    	this.editModule.imageUrl = file.name
		    }
          		    
        }
    }
</script>

<style scoped>
.lanmu-main{min-height: 260px;}
.handle-box{margin-bottom: 20px;}
.module-crumbs{margin-top: 20px;margin-bottom: 20px;}
</style>
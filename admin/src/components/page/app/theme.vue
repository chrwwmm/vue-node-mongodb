<template>
	<div class="main">
		<div class="table">
	        <div class="crumbs">
	            <el-breadcrumb separator="/">
	                <el-breadcrumb-item><i class="el-icon-menu"></i> app</el-breadcrumb-item>
	                <el-breadcrumb-item>theme</el-breadcrumb-item>
	            </el-breadcrumb>
	        </div>
	        <div class="theme">
	        	<div class="handle-box">
		        	<el-button type="primary" icon="edit" class="handle-add mr10" @click="handleAdd">添加theme</el-button>
		            <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>         
		        </div>
		        <div class="theme-main">
		        	<el-table :data="theme" highlight-current-row border style="width: 100%" ref="multipleTable">
			            <el-table-column type="selection" width="80"></el-table-column>
						<el-table-column type="index" width="100"></el-table-column>
						<!--<el-table-column prop="id" label="ID" width="100" sortable></el-table-column>-->
						<el-table-column prop="name" label="theme名称" width="180"></el-table-column>
						<el-table-column prop="url" label="url" width="180"></el-table-column>
						<el-table-column prop="intro" label="intro" min-width="280"></el-table-column>
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
				<!--<el-col class="pagination">
		            <el-pagination
		                    @current-change ="handleCurrentChange"
		                    layout="prev, pager, next"
		                    :total="50">
		            </el-pagination>
				</el-col>-->
	        </div> 
		</div>
    	   	
    	<!--编辑界面-->
		<el-dialog title="编辑theme" v-model="editFormVisible">
			<el-form :model="editForm" label-width="100px">
				<el-form-item label="theme名称" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="url" prop="url">
					<el-input v-model="editForm.url"></el-input>
				</el-form-item>
				<el-form-item label="intro" prop="intro">
					<el-input v-model="editForm.intro"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit">提交</el-button>
			</div>
		</el-dialog>
		
	    <!--新增界面-->
		<el-dialog title="添加theme" v-model="addFormVisible">
			<el-form :model="addForm" label-width="100px">
				<el-form-item label="theme名称" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="url" prop="url">
					<el-input v-model="addForm.url"></el-input>
				</el-form-item>
				<el-form-item label="intro" prop="intro">
					<el-input v-model="addForm.intro"></el-input>
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
	import { delaTheme,addaTheme,editaTheme,getaTheme } from '../../../api/api';
    export default {
        data() {
            return {
            	addFormVisible: false,//新增界面是否显示
            	editFormVisible: false,//编辑界面是否显示
            	
          		// upload
        		dialogVisible: false,
        		
            	theme:[],
            	multipleSelection: [],
            	cur_page: 1,
            	
            	//编辑界面数据
				editForm: {
					name: '',
					url:'',
					intro:''
				},
				
            	//新增界面数据
				addForm: {
					name: '',
					url:'',
					intro:''
				}
            }
        },
        created(){
            this.getaTheme();
        },
        methods: {
        	handleCurrentChange(val){
                this.cur_page = val;
                this.getmPage();
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
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let rid= row._id;
					console.log(rid);
					let para = { id: rid };
					delaTheme(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getaTheme();
					});
				}).catch(() => {});
			},

			//编辑提交
			editSubmit: function () {
				let editName = this.editForm.name;
				let editUrl = this.editForm.url;
				let editIntro = this.editForm.intro;
				if (editName===''||editUrl===''||editIntro==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = Object.assign({}, this.editForm);
						console.log(para)
						editaTheme(para).then((res) => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});	
							this.getaTheme();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.editFormVisible = false;					
				}
			},
			//新增
			addSubmit: function () {
				let addName = this.addForm.name;
				let addUrl = this.addForm.url;
				let addIntro = this.addForm.intro;
				if (addName===''||addUrl===''||addIntro==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = { name: addName,url:addUrl,intro:addIntro }; //这里为什么写成 let para = { name: this.addName }; 时， addLanmu.php报错:name为undefined
						console.log(para.name)
						addaTheme(para).then((res) => {
							this.$message({
								message: '添加成功',
								type: 'success'
							});	
							this.getaTheme();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.addFormVisible = false;					
				}
			},
            getaTheme(){
//          	let para = { page:this.cur_page };
				getaTheme().then((res) => {
					this.theme = res.data.result;
				});
            },
            //批量删除
			delAll(){}
          		    
        }
    }
</script>

<style scoped>
.theme-main{min-height: 260px;}
.handle-box{margin-bottom: 20px;}
.module-crumbs{margin-top: 20px;margin-bottom: 20px;}
</style>
<template>
	<div class="main">
		<div class="table">
	        <div class="crumbs">
	            <el-breadcrumb separator="/">
	                <el-breadcrumb-item><i class="el-icon-menu"></i> myapp</el-breadcrumb-item>
	                <el-breadcrumb-item>m-首页</el-breadcrumb-item>
	            </el-breadcrumb>
	        </div>
	        <div class="lanmu">
	        	<div class="handle-box">
		        	<el-button type="primary" icon="edit" class="handle-add mr10" @click="handleAdd">添加栏目</el-button>
		            <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>         
		        </div>
		        <div class="lanmu-main">
		        	<el-table :data="mlanmu" highlight-current-row border style="width: 100%" ref="multipleTable">
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
	import { delmLanmu,addmLanmu,editmLanmu,getmPage } from '../../../api/api';
    export default {
        data() {
            return {
            	addFormVisible: false,//新增界面是否显示
            	editFormVisible: false,//编辑界面是否显示
            	
          		// upload
        		dialogVisible: false,
        		
            	mlanmu:[],
            	multipleSelection: [],
            	cur_page: 1,
            	//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					url:''
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
            this.getmPage();
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
					let para = { id: row.id };
					delmLanmu(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getmPage();
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
						editmLanmu(para).then((res) => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});	
							this.getmPage();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.editFormVisible = false;					
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
						addmLanmu(para).then((res) => {
							this.$message({
								message: '添加成功',
								type: 'success'
							});	
							this.getmPage();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.addFormVisible = false;					
				}
			},
            getmPage(){
            	let para = { page:this.cur_page };
				getmPage(para).then((res) => {
					this.mlanmu = res.data;
				});
            },
            //批量删除
			delAll(){}
          		    
        }
    }
</script>

<style scoped>
.lanmu-main{min-height: 260px;}
.handle-box{margin-bottom: 20px;}
.module-crumbs{margin-top: 20px;margin-bottom: 20px;}
</style>
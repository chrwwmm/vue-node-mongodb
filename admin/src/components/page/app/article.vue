<template>
	<div class="main">
		<div class="table">
	        <div class="crumbs">
	            <el-breadcrumb separator="/">
	                <el-breadcrumb-item><i class="el-icon-menu"></i> app</el-breadcrumb-item>
	                <el-breadcrumb-item>article</el-breadcrumb-item>
	            </el-breadcrumb>
	        </div>
	        <div class="article">
	        	<div class="handle-box">
		        	<el-button type="primary" icon="edit" class="handle-add mr10" @click="handleAdd">添加article</el-button>
		            <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>         
		        </div>
		        <div class="article-main">
		        	<el-table :data="article" highlight-current-row border style="width: 100%" ref="multipleTable">
			            <el-table-column type="selection" width="50"></el-table-column>
						<el-table-column type="index" width="50"></el-table-column>
						<el-table-column prop="title" label="标题" width="220"></el-table-column>
						<el-table-column prop="author" label="作者" width="120"></el-table-column>
						<el-table-column prop="type.name" label="分类" width="120"></el-table-column>
						<!--<el-table-column prop="date" label="创建时间" width="120"></el-table-column>-->
						<el-table-column prop="intro" label="简介" min-width="200"></el-table-column>
						<!--<el-table-column prop="content" label="文章内容" min-width="280"></el-table-column>-->
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
		<el-dialog title="编辑article" v-model="editFormVisible">
			<el-form :model="editForm" label-width="80px">
				<el-form-item label="文章标题" prop="title">
					<el-input v-model="editForm.title"></el-input>
				</el-form-item>
				<el-form-item label="文章作者" prop="author">
					<el-input v-model="editForm.author"></el-input>
				</el-form-item>
				<el-form-item label="文章分类" prop="type">
					<el-select v-model="editForm.type._id" placeholder="请选择"> <!--多选:multiple-->
					    <el-option
					      v-for="item in theme"
					      :key="item._id"
					      :label="item.name"
					      :value="item._id">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="文章简介" prop="intro">
					<el-input v-model="editForm.intro"></el-input>
				</el-form-item>
				<el-form-item label="文章内容" prop="content">
					<quill-editor ref="myTextEditor" v-model="editForm.content" :config="editorOption"></quill-editor>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click="editSubmit">提交</el-button>
			</div>
		</el-dialog>
		
	    <!--新增界面-->
		<el-dialog title="添加article" v-model="addFormVisible">
			<el-form :model="addForm" label-width="80px">
				<el-form-item label="文章标题" prop="title">
					<el-input v-model="addForm.title"></el-input>
				</el-form-item>
				<el-form-item label="文章作者" prop="author">
					<el-input v-model="addForm.author"></el-input>
				</el-form-item>
				<el-form-item label="文章分类" prop="type">
					<el-select v-model="addForm.type" placeholder="请选择">
					    <el-option
					      v-for="item in theme"
					      :key="item._id"
					      :label="item.name"
					      :value="item._id">
					    </el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="文章简介" prop="intro">
					<el-input v-model="addForm.intro"></el-input>
				</el-form-item>
				<el-form-item label="文章内容" prop="content">
					<quill-editor ref="myTextEditor" v-model="addForm.content" :config="editorOption"></quill-editor>
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
	import { delaArticle,addaArticle,editaArticle,getaArticle,getaTheme } from '../../../api/api';
	import { quillEditor } from 'vue-quill-editor';
    export default {
        data() {
            return {
            	addFormVisible: false,//新增界面是否显示
            	editFormVisible: false,//编辑界面是否显示
            	
          		// upload
        		dialogVisible: false,
        		
            	article:[],
            	theme:[],
            	
                editorOption: {
                    // something config
                },
            	
            	multipleSelection: [],
            	cur_page: 1,
            	
            	//编辑界面数据
				editForm: {
					title: '',
					author:'',
					type:'',
					intro:'',
					content:''
				},
				
            	//新增界面数据
				addForm: {
					title: '',
					author:'',
					type:'',
					intro:'',
					content:'<p>Hello BBK 2017/12/5</p>'
				}
            }
        },
        components: {
            quillEditor
        },
        created(){
            this.getaArticle();
            this.getaTheme();
        },
        methods: {
        	handleCurrentChange(val){
                this.cur_page = val;
                this.getaArticle();
            },
        	//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
			},
			//编辑
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
				console.log(this.editForm)
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					let rid= row._id;
					console.log(rid);
					let para = { id: rid };
					delaArticle(para).then((res) => {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getaArticle();
					});
				}).catch(() => {});
			},

			//编辑提交
			editSubmit: function () {
				let editId = this.editForm._id;
				let editTitle = this.editForm.title;
				let editAuthor = this.editForm.author;
				let editType = this.editForm.type._id;
				let editIntro = this.editForm.intro;
				let editContent = this.editForm.content;
				console.log(editType)
				if (editTitle===''||editAuthor===''||editType===''||editIntro===''||editContent==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = { id:editId, title: editTitle,author:editAuthor,type:editType,intro:editIntro,content:editContent }; 
//						let para = Object.assign({}, this.editForm);
						console.log(para)
						editaArticle(para).then((res) => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});	
							this.getaArticle();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.editFormVisible = false;					
				}
			},
			//新增
			addSubmit: function () {
				let addTitle = this.addForm.title;
				let addAuthor = this.addForm.author;
				let addType = this.addForm.type;
				let addIntro = this.addForm.intro;
				let addContent = this.addForm.content;
				console.log(addTitle,addAuthor,addType,addIntro)
				if (addTitle===''||addAuthor===''||addType===''||addIntro===''||addContent==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = { title: addTitle,author:addAuthor,type:addType,intro:addIntro,content:addContent }; //这里为什么写成 let para = { name: this.addName }; 时， addLanmu.php报错:name为undefined
						addaArticle(para).then((res) => {
							this.$message({
								message: '添加成功',
								type: 'success'
							});	
							this.getaArticle();
						});
					}).catch(() => {
						console.log("失败！");
					});
					this.addFormVisible = false;					
				}
			},
//          getaPage(){
////          	let para = { page:this.cur_page };
//				getaPage().then((res) => {
//					this.article = res.data.result;
//				});
//          },
			getaArticle(){
				let para = { page:this.cur_page };
				getaArticle(para).then((res) => {
					this.article = res.data.result;
				});
          	},
          	getaTheme(){
				getaTheme().then((res) => {
					this.theme = res.data.result;
				});
          	},
            //批量删除
			delAll(){},
			
			onEditorChange({ editor, html, text }) {
                this.content = html;
            },
          		    
       	},
       	computed: {
            editor() {
                return this.$refs.myTextEditor.quillEditor;
            }
        }
    }
</script>

<style scoped>
.article-main{min-height: 260px;}
.handle-box{margin-bottom: 20px;}
.module-crumbs{margin-top: 20px;margin-bottom: 20px;}
</style>
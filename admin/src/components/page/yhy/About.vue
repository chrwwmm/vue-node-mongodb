<template>
	<div class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 亿慧云</el-breadcrumb-item>
                <el-breadcrumb-item>公司介绍</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form :model="form" label-width="80px" style="margin:30px;width:60%;min-width:600px;">
	            <el-form-item label="栏目名称" prop="name">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="上传图片">
					<el-upload
						action="http://localhost/api/vue-admin/upload.php"
						list-type="picture-card"
						:on-preview="handlePictureCardPreview"
						:on-remove="handleRemove"
						:on-success="uploadSuccess">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog v-model="dialogVisible" size="tiny">
					  <img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
					<img width="150px" :src="'http://localhost/api/uploads/' + form.imageUrl" alt="">
				</el-form-item>			
				<el-form-item label="公司简介" prop="intro">
					<el-input type="textarea" :rows="5" v-model="form.intro"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" class="aboutEdit" @click="aboutEdit">编辑提交</el-button>
					<el-button type="primary" class="aboutEdit" @click="proxyTable">跨域测试</el-button>
				</el-form-item>            
			</el-form>
        </div>	        
	</div>
</template>

<script>
	import { getAbout,editAbout } from '../../../api/api';
	export default {
		data() {
			return {
				form: {
					name: '',
					imageUrl: '',
					intro: ''
				},
				dialogImageUrl: '',
        		dialogVisible: false
			}
		},
		created(){
            this.getAbout();
        },
		methods: {
		    handleRemove(file, fileList) {
		        console.log(file, fileList);
		    },
		    handlePictureCardPreview(file) {
		        this.dialogImageUrl = file.url;
		        this.dialogVisible = true;
		    },
		    uploadSuccess(res,file, fileList){
		    	console.log(res);
		    	console.log(file.name);
		    	this.form.imageUrl = file.name
		    },
		    getAbout(){
				getAbout().then((res) => {
					this.form.name = res.data[0].name;
					this.form.imageUrl = res.data[0].imageUrl;
					this.form.intro = res.data[0].intro;
				});
            },
		    
		    //编辑提交
			aboutEdit: function () {
				let editName = this.form.name;
				let editImg = this.form.imageUrl;
				let editIntro = this.form.intro;
				if (editName===''||editImg===''||editIntro==='') {
					this.$message({
						message: '栏目不能为空！'
					});
				}else{
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						let para = { name: editName, imageUrl:editImg, intro:editIntro };
						console.log(para.imageUrl)
						editAbout(para).then((res) => {
							this.$message({
								message: '编辑成功',
								type: 'success'
							});	
							this.getAbout();
						});
					}).catch(() => {
						console.log("失败！");
					});				
				}
			},
			
			//跨域测试
			proxyTable: function () {
				this.$axios.get('/api/vue-admin/proxyTable.php').then((response)=>{
					console.log(response,'成功！');
				})
			}
	    }
	}

</script>
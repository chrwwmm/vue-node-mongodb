<template>
	<div class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 亿慧云</el-breadcrumb-item>
                <el-breadcrumb-item>产品中心</el-breadcrumb-item>
            </el-breadcrumb>
            <el-form class="" style="margin:30px;width:60%;min-width:600px;">
				<el-input-number v-model="form.num"></el-input-number>
				<el-input-number v-model="form.num1" @change="handleChange" :min="1" :max="10"></el-input-number>
            </el-form>   
            <div class="plugins-tips">
	            Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
	            访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
	        </div>
	        <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
	        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>	        
	</div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor';
  import { getEdit,editSubmit} from '../../../api/api';
  export default {
    data() {
      return {
        form:{
        	num: 0,
        	num1:1
        },
        content: '',
        editorOption: {
            // something config
        }
      }
    },
    components: {
        quillEditor
    },
    created(){
            this.getEdit(
            	console.log(this.content)
            );
        },
    methods: {
      handleChange(value) {
//      console.log(value);
      },
      onEditorChange({ editor, html, text }) {
        this.content = html;
      },
      getEdit(){
			getEdit().then((res) => {
				console.log(res.data);
				this.content = res.data[0].content;
			});
	    },
      submit(){
        console.log(this.content);
        this.$confirm('确认提交吗？', '提示', {}).then(() => {
//    	let para = { content: this.content };
//			editSubmit(para).then((res) => {
//				this.$message({
//					message: '提交成功',
//					type: 'success'
//				});	
//			});
//		}).catch(() => {
//			console.log("失败！");
//		});
		  this.$axios.post('http://localhost/api/vue-admin/editSubmit.php',
		     this.content  
		  )
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
      })
      }
    
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor;
        }
    }
  };
</script>

<style scoped>
    .editor-btn{
        margin-top: 20px;
    }
</style>
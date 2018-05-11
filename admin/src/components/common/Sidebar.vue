<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                	{
                        icon: 'el-icon-menu',
                        index: 'yhy',
                        title: '亿慧云',
                        subs: [
                            {
                                index: 'index',
                                title: '首页'
                            },
                            {
                                index: 'about',
                                title: '公司介绍'
                            },
                            {
                                index: 'product',
                                title: '产品中心'
                            },
                            {
                                index: 'solution',
                                title: '智慧家庭'
                            },
                            {
                                index: 'case',
                                title: '成功案例'
                            },
                            {
                                index: 'skill',
                                title: '服务与支持'
                            },
                            {
                                index: 'cooperation',
                                title: '招商加盟'
                            },
                            {
                                index: 'contact',
                                title: '联系我们'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'myapp',
                        title: 'myapp',
                        subs: [
                            {
                                index: 'm-index',
                                title: 'm-首页'
                            },
                            {
                                index: 'm-news',
                                title: 'm-新闻中心'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: 'app',
                        title: 'app',
                        subs: [
                            {
                                index: 'theme',
                                title: 'theme'
                            },
                            {
                                index: 'latest',
                                title: 'latest'
                            },
                            {
                                index: 'article',
                                title: 'article'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '自述'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '表格',
                        subs: [
                            {
                                index: 'basetable',
                                title: '基础表格'
                            },
                            {
                                index: 'vuetable',
                                title: 'Vue表格组件'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '表单',
                        subs: [
                            {
                                index: 'baseform',
                                title: '基本表单'
                            },
                            {
                                index: 'vueeditor',
                                title: '编辑器'
                            },
                            {
                                index: 'markdown',
                                title: 'markdown'
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'basecharts',
                        title: '图表'
                    }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>

import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/readme',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/page/Readme.vue'], resolve)
                },
                {
                    path: '/index',
                    component: resolve => require(['../components/page/yhy/Index.vue'], resolve)
                },
                {
                    path: '/about',
                    component: resolve => require(['../components/page/yhy/About.vue'], resolve)
                },
                {
                    path: '/product',
                    component: resolve => require(['../components/page/yhy/Product.vue'], resolve)
                },
                {
                    path: '/solution',
                    component: resolve => require(['../components/page/yhy/Solution.vue'], resolve)
                },
                {
                    path: '/case',
                    component: resolve => require(['../components/page/yhy/Case.vue'], resolve)
                },
                {
                    path: '/skill',
                    component: resolve => require(['../components/page/yhy/Skill.vue'], resolve)
                },
                {
                    path: '/cooperation',
                    component: resolve => require(['../components/page/yhy/Cooperation.vue'], resolve)
                },
                {
                    path: '/contact',
                    component: resolve => require(['../components/page/yhy/Contact.vue'], resolve)
                },
                {
                    path: '/m-index',
                    component: resolve => require(['../components/page/myapp/m-index.vue'], resolve)
                },
                {
                    path: '/m-news',
                    component: resolve => require(['../components/page/myapp/m-news.vue'], resolve)
                },
                {
                    path: '/theme',
                    component: resolve => require(['../components/page/app/theme.vue'], resolve)
                },
                {
                    path: '/latest',
                    component: resolve => require(['../components/page/app/latest.vue'], resolve)
                },
                {
                    path: '/article',
                    component: resolve => require(['../components/page/app/article.vue'], resolve)
                },
                {
                    path: '/basetable',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve)
                },
                {
                    path: '/vuetable',
                    component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-schart组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})

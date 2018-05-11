import axios from 'axios';

export const delLanmu = params => { return axios.get(`http://localhost/api/vue-admin/delLanmu.php`, { params: params }); };

export const addLanmu = params => { return axios.get(`http://localhost/api/vue-admin/addLanmu.php`, { params: params }); };

export const editLanmu = params => { return axios.get(`http://localhost/api/vue-admin/editLanmu.php`, { params: params }); };

export const getData = params => { return axios.get(`http://localhost/api/vue-admin/lanmu.php`, { params: params }); };

export const getPage = params => { return axios.get(`http://localhost/api/vue-admin/page.php`, { params: params }); };

export const getAbout = params => { return axios.get(`http://localhost/api/vue-admin/about.php`, { params: params }); };

export const getModule = params => { return axios.get(`http://localhost/api/vue-admin/module.php`, { params: params }); };

export const delModule = params => { return axios.get(`http://localhost/api/vue-admin/delModule.php`, { params: params }); };

export const editModule = params => { return axios.get(`http://localhost/api/vue-admin/editModule.php`, { params: params }); };

export const uploadImg = params => { return axios.get(`http://localhost/api/vue-admin/upload.php`, { params: params }); };

export const editAbout = params => { return axios.get(`http://localhost/api/vue-admin/editAbout.php`, { params: params }); };

export const getEdit = params => { return axios.get(`http://localhost/api/vue-admin/getEdit.php`, { params: params }); };

//export const editSubmit = params => { return axios.get(`http://localhost/api/vue-admin/editSubmit.php`, { params: params }); };

//myapp
export const getmPage = params => { return axios.get(`http://localhost/api/vue-admin/mPage.php`, { params: params }); };

export const getmLanmu = params => { return axios.get(`http://localhost/api/vue-admin/mLanmu.php`, { params: params }); };

export const addmLanmu = params => { return axios.get(`http://localhost/api/vue-admin/addmLanmu.php`, { params: params }); };

export const delmLanmu = params => { return axios.get(`http://localhost/api/vue-admin/delmLanmu.php`, { params: params }); };

export const editmLanmu = params => { return axios.get(`http://localhost/api/vue-admin/editmLanmu.php`, { params: params }); };

export const getmTop = params => { return axios.get(`http://localhost/api/vue-admin/mTop.php`, { params: params }); };

export const addmTop = params => { return axios.get(`http://localhost/api/vue-admin/addmTop.php`, { params: params }); };

export const editmTop = params => { return axios.get(`http://localhost/api/vue-admin/editmTop.php`, { params: params }); };

export const delmTop = params => { return axios.get(`http://localhost/api/vue-admin/delmTop.php`, { params: params }); };

export const getmNews = params => { return axios.get(`http://localhost/api/vue-admin/mNews.php`, { params: params }); };

export const addmNews = params => { return axios.get(`http://localhost/api/vue-admin/addmNews.php`, { params: params }); };

export const editmNews = params => { return axios.get(`http://localhost/api/vue-admin/editmNews.php`, { params: params }); };

export const delmNews = params => { return axios.get(`http://localhost/api/vue-admin/delmNews.php`, { params: params }); };


//app theme

export const getaTheme = params => { return axios.get(`http://localhost:3101/theme/type/all`, { params: params }); };

export const addaTheme = params => { return axios.get(`http://localhost:3101/theme/add`, { params: params }); };

export const delaTheme = params => { return axios.get(`http://localhost:3101/theme/del`, { params: params }); };

export const editaTheme = params => { return axios.get(`http://localhost:3101/theme/modify`, { params: params }); };

//app latest

export const latestUpload = params => { return axios.get(`http://localhost:3101/latest/upload`, { params: params }); };

export const getaLatest = params => { return axios.get(`http://localhost:3101/latest/type/all`, { params: params }); };

export const addaLatest = params => { return axios.get(`http://localhost:3101/latest/add`, { params: params }); };

export const editaLatest = params => { return axios.get(`http://localhost:3101/latest/modify`, { params: params }); };

export const delaLatest = params => { return axios.get(`http://localhost:3101/latest/del`, { params: params }); };

export const getaStories = params => { return axios.get(`http://localhost:3101/stories/type/all`, { params: params }); };

export const addaStories = params => { return axios.get(`http://localhost:3101/stories/add`, { params: params }); };

export const editaStories = params => { return axios.get(`http://localhost:3101/stories/modify`, { params: params }); };

export const delaStories = params => { return axios.get(`http://localhost:3101/stories/del`, { params: params }); };

export const getaTop = params => { return axios.get(`http://localhost:3101/top/type/all`, { params: params }); };

export const addaTop = params => { return axios.get(`http://localhost:3101/top/add`, { params: params }); };

export const editaTop = params => { return axios.get(`http://localhost:3101/top/modify`, { params: params }); };

export const delaTop = params => { return axios.get(`http://localhost:3101/top/del`, { params: params }); };

//app article

export const getaArticle = params => { return axios.get(`http://localhost:3101/article/type/all`, { params: params }); };

export const addaArticle = params => { return axios.get(`http://localhost:3101/article/add`, { params: params }); };

export const editaArticle = params => { return axios.get(`http://localhost:3101/article/modify`, { params: params }); };

export const delaArticle = params => { return axios.get(`http://localhost:3101/article/del`, { params: params }); };




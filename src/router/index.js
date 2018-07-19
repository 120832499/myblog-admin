import Vue from 'vue'
import Router from 'vue-router'
import addarticle from '../components/article/addarticle.vue'
import articlelist from '../components/article/articlelist.vue'
import updatearticle from '../components/article/updatearticle.vue'
import Nav from '../components/nav/nav.vue'
import Sign from '../components/sign/sign.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {name: 'nav', path: '/', component: Nav,
      children: [
        {name: 'articlelist', path: '/articlelist', component: articlelist},

        {path: '/addarticle', name: 'addarticle', component: addarticle},
        {path: '/updatearticle', name: 'updatearticle', component: updatearticle}
                
      ]
    },
    {path: '/sign', name: 'sign', component: Sign}
  ]
})

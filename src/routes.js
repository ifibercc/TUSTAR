import Welcome from './components/welcome/Welcome.vue'
import User from './components/User/user.vue'
import Role from './components/Role/role.vue'
import Company from './components/company/Company.vue'
import Function from './components/function/Function.vue'
import baseQuery from './components/example/baseQuery.vue'
import treeGrid from './components/example/treeGrid.vue'
import treeEdit from './components/example/treeEdit.vue'

const routes = [{
    path: '/welcome',
    component: Welcome
}, {
    path: '/user',
    component: User
}, {
    path: '/role',
    component: Role
}, {
    path: '/company',
    component: Company
}, {
    path: '/function',
    component: Function
}, {
    path: '/example/baseQuery',
    component: baseQuery
}, {
    path: '/example/treeGrid',
    component: treeGrid
}, {
    path: '/example/treeEdit',
    component: treeEdit
}]

export default routes
import Vuex from 'vuex'
import Vue  from 'vue'
import user from './user'
import tabs from './tabs'

Vue.use(Vuex)
export default new Vuex.Store({
    //initial state
    modules : {
        user,
        tabs
    },
});
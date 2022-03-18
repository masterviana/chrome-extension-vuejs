const store = {
    state: {
        firstName: '',
        lastName: '',
        username : '',
        password : '',
        isLogged : false
    },
    mutations: {
        username: (state, value) => {
            state.username = value;
        },
        password: (state, value) => {
            state.password = value;
        },
        isLogged: (state, value) => {
            state.isLogged = value;
        }
    },
    actions: {
        setUsername: function({commit}, userInfo){
            //context
            // context.commit
            //context.dispacht
            commit("isLogged", true)
            commit("username", userInfo.username)
            commit("password", userInfo.password)
        }
    },
    getters: {
        fullName: function (state) {
            return `${state.username}`
        },
        hasLogged: function(state){
            return state.isLogged;
        }

    }
}

export default {
    namespaced: true,
    ...store
};
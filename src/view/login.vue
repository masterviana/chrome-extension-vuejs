<template>
  
        <div class="main_app">
  
        <div v-if="!isLogin">
          <v-card >
                <v-card-text>
                
                    <v-text-field
                        prepend-icon=""
                        name="login"
                        label="username"
                        type="text"
                        v-model="username"
                    ></v-text-field>
                    <v-text-field
                        id="password"
                        prepend-icon=""
                        name="password"
                        label="Password"
                        type="password"
                        v-model="password"
                    ></v-text-field>
                
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn color="primary" @click="$router.go(-1)">Login</v-btn> -->
                <v-btn color="black" @click="login">Login</v-btn>
                </v-card-actions>
          </v-card>

          <div>

          </div>
          <div>
              <a href="/"> Signup</a>
          </div>
        
        </div>

        <div v-else>
           <v-card >
             <v-card-text>
               User Profile
               <div>
                  <v-btn @click="logout"> Logout</v-btn>
               </div>
             </v-card-text>
           </v-card>
             
        </div>

       
        </div>
         
</template>

<script>

import {mapActions, mapGetters} from 'vuex'


export default {
  name: 'loginView',

   mounted (){
    console.log('**** mounted login *******');

    let userInfo =  {};
    if(localStorage.getItem('userinfo'))
    {
       console.log('User is already logged ');
       this.isLogin = true;
       userInfo = JSON.parse( localStorage.getItem('userinfo') );
       this.username = userInfo.username;
       this.password = userInfo.password;
       this.setUsername({username : this.username, password:this.password})
      
    }
    
  },
  
  methods: {
      ...mapActions('user', ['setUsername']),
      ...mapGetters('user', ['fullName', 'hasLogged']),
      logout: function(){
        localStorage.removeItem('userinfo');
         this.setUsername({username : '', password: ''})
        this.$router.push('/');
      },
      login : function()
      {
          console.log('**** login callback ****');
          localStorage.setItem('userinfo', JSON.stringify( {username : this.username, password : this.password} ))
          let loaded =  JSON.parse( localStorage.getItem('userinfo') );

          console.log('loaded ',  loaded);
          // this.$store.dispatch('user/setUsername', )
          this.setUsername({username : this.username, password:this.password})
          this.$router.push('/') 


      }
  },
  data () {
    return {
      isLogin : false,
      username : 'user1',
      password : 'password1',
      msg: 'Other view'
    }
  }
}

</script>

<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  min-width: 300px;
  min-height: 500px;
}
</style>

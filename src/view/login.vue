<template>
  
        <div class="main_app">

             
        <v-card class="elevation-12">
           
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

        <a href="/">forget password </a> or signup here:
        <a href="/"> signup</a>

        </div>
         

</template>

<script>



export default {
  name: 'loginView',
  methods: {
      login : function(){
          console.log('**** login callback ****');
          localStorage.setItem('userinfo', JSON.stringify( {username : this.username, password : this.password} ))
          let loaded =  JSON.parse( localStorage.getItem('userinfo') );
          console.log('loaded ',  loaded);
        //   localStorage.getItem('YourItem')
        //   localStorage.removeItem('YourItem')
          this.$router.push('/') 


      }
  },
  data () {
    return {
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

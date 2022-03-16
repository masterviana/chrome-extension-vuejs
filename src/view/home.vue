<template >

  
  <div style="margin-top:14px;">
    
   
    <v-btn to="/"> sync </v-btn>
    <v-btn @click="callFunc"> func1 </v-btn>

    <br><br><br>

    <p> <strong> tracking url's :  </strong></p>
    
    <p v-for="(item, index) in history" :key="index">

      {{item}}
      <v-divider inset></v-divider>
    </p>


     <br> <br>
     <v-btn @click="addDatabase">ok</v-btn>
     <a href="www.google.com" target="_blank"> go to dashboard </a>
    
  </div>

</template>

<script>

// import extension from 'extensionizer';
// import Login from '../view/login'
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp2kyMSd15Ki5iGnBh2FfYUgtX6TOUJsM",
  authDomain: "fitelit-staging.firebaseapp.com",
  databaseURL: "https://fitelit-staging.firebaseio.com",
  projectId: "fitelit-staging",
  storageBucket: "fitelit-staging.appspot.com",
  messagingSenderId: "936101374665",
  appId: "1:936101374665:web:abdd69e0e0e8272fc2bb18"
};

import { getDatabase, ref, set } from "firebase/database";


chrome.tabs.onActivated.addListener( function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        var y = tab.url;
        console.log("you are here: "+y);
    });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {
        console.log("you are here: "+change.url);           
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log('******** Tab onActivated event :  + ******* ' );
    console.log(activeInfo.tabId);
});

export default {
   components: {
    // login : Login
  },
  name: 'homeView',
  mounted (){
    console.log('home mounted ');
   
   
  },
  methods : {
    addDatabase: async function()
    {
        const app = initializeApp(firebaseConfig);
        console.log('****** addDatabase *******')

        const db = getDatabase(app);
        const userId = 1;
        const name = 'vitor';
        const imageUrl = 'adeus';

      try{
        await set(ref(db, 'users/' + userId), {
          id : userId,
          username: name,
          email: name,
          profile_picture : imageUrl,
          createAt : new Date().getTime()
        });

        console.log('get from db ' );
      }catch(ex){
        console.log('Error calling firebase ', ex);
      }

       
    },
    addUrl : async function(url){
        this.history.push(url);
    },
    callFunc : async function()
    {
    //   let self = this;
      console.log('***********   callFunc ***********');

      // let queryOptions = { active: true, currentWindow: true };
       let tabs = await chrome.tabs.query({});
       console.log('tabs from vue ', tabs);


     
    }
  },
  data () {
    return {
      isLogin : false,
      msg: 'popup',
      currentUrl : 'https://web.whatsapp.com/',
      history : [
        'https://web.whatsapp.com/ : 00:52',
        'https://web.whatsapp.com/ : 03:52',
        'https://web.whatsapp.com/ : 03:52',
        'https://web.whatsapp.com/ : 03:52',
        'https://web.whatsapp.com/ : 03:52',
      ]
    }
  }
}

</script>



<style>
.main_app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left !important;
  color: #2c3e50;
  margin-top: 1px !important;
  min-width: 300px;
  min-height: 500px;
}
</style>

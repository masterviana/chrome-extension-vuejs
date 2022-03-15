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
     <a href="www.google.com" target="_blank"> go to dashboard </a>
    
  </div>

</template>

<script>

// import extension from 'extensionizer';
// import Login from '../view/login'

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

export default {
   components: {
    // login : Login
  },
  name: 'homeView',
  mounted (){
    console.log('home mounted ');
   
   
  },
  methods : {
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

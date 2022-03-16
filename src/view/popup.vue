<template >

  
  <div   class="main_app">
    
    <v-app-bar v-if="!hideAppHeader" height="50" flat app >

      <v-toolbar-title>Tracking Plugin</v-toolbar-title>

      <v-spacer />

      <!-- <div
        v-if="address"
        @click.stop="showMenu = !showMenu"
        style="cursor: pointer;"
      >
        <jazz-icon
          v-show="walletAddress"
          :address="walletAddress"
          :id="'bar'"
          :size="44"
          :margin="3"
        />
      </div> -->
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <div>@vviana</div>


    </v-app-bar>



    <!-- <p><strong> Current URL :  </strong> {{currentUrl}}</p>
    <br> <br>

    <p> <strong> Last top 5 : </strong></p>
    
    <p v-for="(item, index) in history" :key="index">

      {{item}}
      <v-divider inset></v-divider>
    </p> -->


<!-- 
    <v-btn to="/home"> sync </v-btn>
    <v-btn @click="callFunc"> func1 </v-btn> -->


    <v-btn to="/login"> login </v-btn>
    <router-view></router-view>

    
  </div>

  <!-- <div v-else >
    <login />
  </div> -->



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

const getActiveUrl = (tabid, changeInfo, tab) => 
{
  const url = changeInfo.url;

  console.log('tab : ', tab);

  // url is likely to be empty, and filter chrome:// and about:// URLs
  if (!url || ['chrome://', 'about://'].some(p => url.startsWith(p))) return;

  // filtering is not an active tab
  //if (!tab.active) return;

  // the url address you need
  console.log('url ', url);
  this.addUrl(url);
}

chrome.tabs.onUpdated.addListener(getActiveUrl);


export default {
   components: {
    // login : Login
  },
  name: 'popupView',
  mounted (){
    console.log('popup mounted ');
    this.$router.push('login') 
   
  },
  methods : {
    addUrl : async function(url){
        this.history.push(url);
    },
    callFunc : async function()
    {
      let self = this;
      console.log('***********   callFunc ***********');

      // let queryOptions = { active: true, currentWindow: true };
       let tabs = await chrome.tabs.query({});
       console.log('tabs from vue ', tabs);

     
      // console.log('data : ', data)
       self.history = [];
        // let i =1;

      // chrome.windows.getAll({populate:true},function(windows){
      //   windows.forEach(function(window){
      //     window.tabs.forEach(function(tab){
      //       //collect all of the urls here, I will just log them instead
      //       console.log('tab' , tab, ' i ', i++);
      //       self.history.push(tab.url);
      //     });
      //   });
      // });

     
      // console.log('Chrome extentsions getBackgroundPage ', extension.windows.API  );
    }
  },
  data () {
    return {
      isLogin : false,
      msg: 'popup',
      hideAppHeader : false,
      currentUrl : 'https://web.whatsapp.com/',
      history : [
        'https://web.whatsapp.com/'
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

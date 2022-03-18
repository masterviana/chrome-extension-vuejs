import Vue from 'vue'
import App from '../view/popup.vue'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import router from '../router'
import store from '../store'


// import extension from 'extensionizer';

Vue.config.productionTip = false

console.log('Chrome extentsions ', chrome );
console.log('Chrome extentsions extenstion ', chrome.extension );
// console.log('Chrome extentsions getBackgroundPage ', chrome.extension.getBackgroundPage() );

//  const { API } = chrome.extension.getBackgroundPage();

// window.$API = API;
// Vue.prototype.$API = API;


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


Vue.use(Vuetify);


new Vue({
  router,
  store,
  vuetify: new Vuetify({}),
  render: (h) => h(App)
}).$mount('#app')

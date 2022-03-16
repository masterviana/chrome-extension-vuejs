/* eslint-disable no-alert, no-console, no-unused-vars */

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
// import moment from 'moment';

console.log('**** Loaded firebase file ***  ');

let _currentTabUrl = '';
let currentInfo = {}

const checkCurrentData = async function(url, tab )
{
    //change current tab url
    if(url !== _currentTabUrl)
    {
        let now = new Date().getTime();


        _currentTabUrl = url;
        currentInfo = {
            createdAt : new Date().getTime()
        }
    }
    
}

const firebaseConfig = {
    apiKey: "AIzaSyDp2kyMSd15Ki5iGnBh2FfYUgtX6TOUJsM",
    authDomain: "fitelit-staging.firebaseapp.com",
    databaseURL: "https://fitelit-staging.firebaseio.com",
    projectId: "fitelit-staging",
    storageBucket: "fitelit-staging.appspot.com",
    messagingSenderId: "936101374665",
    appId: "1:936101374665:web:abdd69e0e0e8272fc2bb18"
};


const storeOnTable = async function (table, tableId, data)
{
    try
    {
        console.log('******  store on table ******* ', table )

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);


        await set(ref(db, 'table/' + tableId ), {
            ...data,
            createdAt : new Date().getTime()
            });

    }catch(ex){
        console.log('Error calling firebase ', ex);
    }
}
// store user id
const storeActivity = async function storeActivity(tab, state)
{
    const app = initializeApp(firebaseConfig);
    console.log('****** addDatabase ******* ', tab , ' s ', state)

    const db = getDatabase(app);
    const userId = 1;
    const uuid = new Date().getTime()

  try
  {
      
    await set(ref(db, 'tabsRawAtivity/' +userId+'/'+ uuid), {
      id : userId,
      createdAt : new Date().getTime(),
      activeAt: new Date().toString(),

      url: tab.url || '<empty>',
      tabTitle : tab.title || '<empty>',
      state : state || '<empty>',
      favIconUrl : tab.favIconUrl || '<empty>',
      index : tab.index || '<empty>'
    });

  }catch(ex){
    console.log('Error calling firebase ', ex);
  }
}

// const funcTemplate = async function(tab)
// {
//     const FUNC_NAME = ''
//     try{

//     }catch(ex){
//         console.log('error on fun ' + FUNC_NAME, ' with stack ', ex )
//     }
// }

// const getTabInfoAndProcess = async function(tabData, eventType)
// {
//     const FUNC_NAME = 'getTabInfoAndProcess'


chrome.tabs.onActivated.addListener(activeInfo => {
    console.log('onActivated:activeInfo ', activeInfo )
    chrome.tabs.get(activeInfo.tabId, async (tab) =>
    {   
        console.log('onActivated:getInfo  ', tab );
        checkCurrentData(tab.url, tab)
        storeActivity(tab, 'onActivated' )
    });
});


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo ) => 
{
    console.log('onUpdated:listener ', tabId );
    console.log('onUpdated:listener ', changeInfo, tabInfo );
    checkCurrentData(tabInfo.url, tabInfo)

});






// chrome.tabs.onCreated.addListener(function(tab){
//     chrome.storage.local.set({tab.id : performance.now()});
// }); 


// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     console.log('addListener ',tabId, ' changeInfo ', changeInfo );
//     storeActivity(tab, 'onUpdated' )
// });

// chrome.tabs.onCreated.addListener(function(tab) {         
//     storeActivity(tab, 'onCreated' )
// });


// open onboarding page event on installation

// chrome.runtime.onInstalled.addListener((reason) => {
//     if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
//       chrome.tabs.create({
//         url: 'onboarding.html'
//       });
//     }
// });
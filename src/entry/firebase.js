/* eslint-disable no-alert, no-console, no-unused-vars, no-useless-escape */
console.log('hello world firebase todo something~')

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, update } from "firebase/database";
import moment  from 'moment';

// import moment from 'moment';

console.log('**** Loaded firebase file ***  ');

const firebaseConfig = {
    apiKey: "AIzaSyDp2kyMSd15Ki5iGnBh2FfYUgtX6TOUJsM",
    authDomain: "fitelit-staging.firebaseapp.com",
    databaseURL: "https://fitelit-staging.firebaseio.com",
    projectId: "fitelit-staging",
    storageBucket: "fitelit-staging.appspot.com",
    messagingSenderId: "936101374665",
    appId: "1:936101374665:web:abdd69e0e0e8272fc2bb18"
};

const TOP_DOMAINS_PATH = 'globalActivity/topdomainsglobal';
const TOP_DOMAINS_USER_PATH = 'globalActivity/topdomainssusers';
let username = 'vviana'

const LOG_PATH  = 'logging'
const CLEAN_DOMAIN_REGEX  = '^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)'; 


let _currentTabUrl = '';
let currentInfo = {
    start : new Date().getTime()
}

// update global status for both users and global status
const updateOrCreateGlobalStatus = async function(key, url, baseDomain, diff, tab)
{
        let globalTopDomainData = await readData(key);

        // update diff time for that top domain
        if(globalTopDomainData){            
            let newDiff = globalTopDomainData.totalTimeSpend + diff;

            // let p = LOG_PATH + '/TRACE_UPDATE/' + new Date().getTime();
            // storeOnTable(p, {diff , globalTopDomainKey , newDiff,  status : 'SHOUD_UPDATED'});
            await updateData(key+'/totalTimeSpend', newDiff  );
            await updateData(key+'/updatedAt', new Date().getTime()  );
        }
        // top domain not created 
        else{
            let newTopDomain =
            {
                url,
                title : tab.title,
                favIconUrl : tab.favIconUrl,
                tabMeta : tab,
                baseDomain,
                totalTimeSpend : diff,
                createdAt : new Date().getTime(),
                updatedAt : new Date().getTime()
            }
            await storeOnTable(key, newTopDomain );
        }

}

const checkCurrentData = async function(url, tab )
{
    
    if( _currentTabUrl === '' ){
        _currentTabUrl = url;
        return;
    }

    //change current tab url
    if( url !== _currentTabUrl )
    {
        let end =  new Date().getTime();
        let diff = moment(end).diff(moment(currentInfo.start)) 
        let diffFormat = moment.utc(diff).format("HH:mm:ss.SSS");

        // logging storage
        let _path = LOG_PATH + '/checkCurrentData/' + new Date().getTime();
        storeOnTable(_path, {url , currentUrl : _currentTabUrl  , diff,  state : 'checkCurrentData'});
       
        // get the base domain
        let baseDomain      = _currentTabUrl.match(CLEAN_DOMAIN_REGEX)[1];
        let key             = baseDomain.replace(/\./g, '|');

        //update global status object
        //read if there is already this topdomain on db
        let globalTopDomainKey = TOP_DOMAINS_PATH + '/' + key ;
        let userGlobalTopDomainKey = TOP_DOMAINS_USER_PATH + '/' +username +'/' +  key;

        //update global object for global statys
        updateOrCreateGlobalStatus(globalTopDomainKey, url, baseDomain, diff, tab );
        // update or create global status for user
        updateOrCreateGlobalStatus(userGlobalTopDomainKey, url, baseDomain, diff, tab );

        let p = LOG_PATH + '/TRACE/' + new Date().getTime();
        storeOnTable(p, {url , globalTopDomainKey ,  status : 'TRACE'});


        // update current url
        _currentTabUrl = url;
        currentInfo = {
            start : new Date().getTime()
        }

    }
    
}

const storeOnTable = async function (path, data)
{
    try
    {
        console.log('******  storeOnTable ******* ', path )

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);


        await set(ref(db, path ), {
            ...data,
            createdAt : new Date().getTime()
            });

    }catch(ex){
        console.log('Error calling firebase storeOnTable ', ex);
    }
}

const readData = async function (path)
{
    try
    {
        console.log('****** readData *******')
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);

        // const readData = await ref(db, 'globalActivity/topdomains/google');

        const dbRef = ref(getDatabase());
        //const path = 'globalActivity/topdomains/google';

        let snapshot = await get(child(dbRef, path ));
        if (snapshot.exists()) {
            console.log('readed data ' , snapshot.val());
            return snapshot.val();
        }
        else{
            return '';
        }

    }catch(ex){
        console.log('Error calling readData readData ', ex);
        let p = LOG_PATH + '/ERROR/' + new Date().getTime();
        storeOnTable(p, {mgs :'ERROR READING DATA ', k : path });
    }
}

const updateData = async function (path, objToUpdate)
{
    try
    {
        console.log('****** updateData *******')

        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        
        //const path = 'globalActivity/topdomains/google';

        // let actualState = await this.readData();
        // actualState['totalSpendInMilis'] += 923
        // console.log('UODATES ',  actualState )

        let updates = {}
        updates[path] =  objToUpdate

        update(ref(db), updates );

    }catch(ex){
        console.log('Error calling firebase readData ', ex);
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


chrome.tabs.onActivated.addListener(activeInfo => {

    // console.log('onActivated:activeInfo ', activeInfo )
    chrome.tabs.get(activeInfo.tabId, async (tab) =>
    {   
        console.log('onActivated:getInfo  ', tab );
        let _path = LOG_PATH + '/onActivated/' + new Date().getTime();
        storeOnTable(_path, {...tab, state : 'onActivated'});

        checkCurrentData(tab.url, tab)
        storeActivity(tab, 'onActivated' )
    });

});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tabInfo ) => 
{
    // console.log('onUpdated:listener ', tabId );
    // console.log('onUpdated:listener ', changeInfo, tabInfo );
    // 

    let _path = LOG_PATH + '/onUpdated/' + new Date().getTime();
    storeOnTable(_path, {...tabInfo, state : 'onupdate'});

    if(tabInfo.status === 'complete'){
        checkCurrentData(tabInfo.url, tabInfo)
    }
        
});


// const funcTemplate = async function(tab)
// {
//     const FUNC_NAME = ''
//     try{

//     }catch(ex){
//         console.log('error on fun ' + FUNC_NAME, ' with stack ', ex )
//     }
// }


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
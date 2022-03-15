import extension from 'extensionizer';

console.log('hello world background todo something~')


async function getTabs(){

  console.log('*** get tabs *** ');
  // let queryOptions = { active: false, currentWindow: false };
  let a = await chrome.tabs.query({url : '*://developer.mozilla.org/*'})
  console.log('Tabs : ', a);

}

setInterval(async function(){

  console.log('interval on background');
  getTabs();


}, 5000)

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
}

chrome.tabs.onUpdated.addListener(getActiveUrl);

// let utils = function(){

//     this.func1 = function(){
//         console.log('Func 1 called');
//     }

// }

// function foo() {
//     console.log("I'm defined in background.js");
//   }

extension.windows.API = { name : 'vitor '}

console.log('backgroud Window API : ', extension.windows.API );
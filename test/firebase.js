/* eslint-disable no-alert, no-console, no-unused-vars */

// https://stackoverflow.com/questions/45592573/how-to-calculate-difference-between-two-dates-using-node-js
// https://stackoverflow.com/questions/13262621/how-to-use-format-on-a-moment-js-duration

let moment = require('moment');

let start  = new Date().getTime();


setInterval(function()
{
    let end = new Date().getTime();
    let diff = moment(end).diff(moment(start)) 

    let diffFormat = moment.utc(diff).format("HH:mm:ss.SSS");
    let durationInMili = moment.duration(diff).asMilliseconds();

    console.log('diff from dates ', diff, ' formated : ', diffFormat  );

} , 5000)

let loaded = moment(start).format("DD MMM YYYY hh:mm a") 


console.log('milis :', loaded)

let regexp = '^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)'
let str = 'https://play.google.com/store/apps/details?id=com.skgames.trafficracer%22'
str = 'https://www.google.ru'
let cenas = str.match(regexp);
console.log('cenas ',  cenas[1])


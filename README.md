# plugin-v3

https://stackoverflow.com/questions/13546778/how-to-communicate-between-popup-js-and-background-js-in-chrome-extension

https://github.com/sitepoint-editors/dad-joke-chrome-extension


firebase 
// https://stackoverflow.com/questions/67439012/chrome-extension-manifest-v3-content-security-policy

//video setting chrome manifest 3
https://www.youtube.com/watch?v=UjH2INUPmF4


https://stackoverflow.com/questions/44223842/is-there-a-way-determine-the-time-spent-by-a-user-on-each-tab-by-using-chrome-ex

It shouldn't be too difficult to implement, just a little bit of work.

Log the current time as soon as a tab is opened
When you need to calculate the time, you would just go to your storage and grab it out and subtract (currentTime - opededTime)
Additionally, you can also log the time when a tab is closed
You won't be able to log times for tabs that are already opened before your extension is installed.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

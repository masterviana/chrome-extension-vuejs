

// https://www.npmjs.com/package/parse-domain

import { parseDomain, ParseResultType } from "parse-domain";

const CLEAN_DOMAIN_REGEX  = '^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)';
let url = 'www.console.firebase.google.co.uk/nadnansd/adasdasd/adasdas?asd=2325'

let p = url.match(CLEAN_DOMAIN_REGEX)[1];
console.log('p : ', p );

const parseResult = parseDomain(
    // This should be a string with basic latin letters only.
    // More information below.
    //"www.console.firebase.google.co.uk",
    p
  );

   const { subDomains, domain, topLevelDomains } = parseResult;
   
   console.log('subDomain : ', subDomains); // ["www", "some"]
   console.log('domain : ',domain); // "example"
   console.log('topLevelDomains', topLevelDomains ); // ["co", "uk"]
   
   let fSub = subDomains.join('.') + '.' + domain;
   console.log('final subdomain : ',fSub )
   
  
  // Check if the domain is listed in the public suffix list
  // if (parseResult.type === ParseResultType.Listed) {
  //   const { subDomains, domain, topLevelDomains } = parseResult;
  
  //   console.log('subDomain : ', subDomains); // ["www", "some"]
  //   console.log('domain : ',domain); // "example"
  //   console.log('topLevelDomains', topLevelDomains ); // ["co", "uk"]
  // } else {
  //   // Read more about other parseResult types below...
  // }

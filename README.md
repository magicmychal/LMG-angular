# LMG-web  
  
## Running on a local machine  
  
### Requirements 
 - Node.js
 Can be installed from https://nodejs.org/en/ for Windows, Linux, and MacOS. 
 - npm or yarn
 - Angular CLI 
Can be install using the following command
`npm install -g @angular/cli`

### First use
Navigate to the ng-lmg-admin folder, run `npm install` or `yarn install` 

## Run
`ng serve`
or 
`ng serve --port xxx` to run on a specific port, by default it is 4200

### removed
ng-lmg-admin/src/environments/environment.prod.ts & ng-lmg-admin/src/environments/environment.ts 
- apiUrl
- mapAppID
- mapAppCode

ng-lmg-admin/src/globals.ts
- apiUrl

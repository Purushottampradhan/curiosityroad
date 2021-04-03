// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  emulator: true,
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig: {
    apiKey: 'AIzaSyB0e9M7iwDIl0UwGmnZLuS-edbYH_qjKKI',
    authDomain: 'get-issues.firebaseapp.com',
    projectId: 'get-issues',
    storageBucket: 'get-issues.appspot.com',
    messagingSenderId: '579312257595',
    appId: '1:579312257595:web:0ee9c7b44df0cd5c736a1e',
    measurementId: 'G-H38MCMYJVK',
    databaseURL: 'http://localhost:9000/?ns=get-issues',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

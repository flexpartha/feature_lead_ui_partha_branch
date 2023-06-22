// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  isMockEnabled: true, // You have to switch this, when your real back-end is done
  authTokenKey: "authce9d77b308c149d5992a80073637e4d5",
  env: "dev",
  instrumentationKey: "",
  redirectUri: "http://localhost:4200/",
  clientId: "e76ca0fd-0545-4b4f-ba26-aa96f8999f4a",
  // policy_signIn: "B2C_1_signin",
  // policy_signUp: "B2C_1_signup",
  policy_signInSignUp: "B2C_1A_signup_signin_linkedin",
  authority:
    "https://cloudlabsqaai.b2clogin.com/cloudlabsqaai.onmicrosoft.com/B2C_1A_signup_signin_linkedin",
  scopes: ["https://adb2caltruifydev.onmicrosoft.com/devapi/api.read"],
  webAPI: "https://adb2caltruifydev.onmicrosoft.com/api",

  appInsights: {
    instrumentationKey: "863daff6-c465-4723-b291-2a9f3a4486ec",
  },
  apiUrl: "https://app-scale-assessment-dev-api.azurewebsites.net",
  //apiUrl: "https://localhost:44353",
  cloudLabsApiBaseUrl: "https://api-qa.cloudlabs.ai/api/",
  //apiUrl: "https://localhost:44353",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

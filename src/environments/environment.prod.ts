export const environment = {
  production: true,
  isMockEnabled: true, // You have to switch this, when your real back-end is done
  authTokenKey: "authce9d77b308c149d5992a80073637e4d5",
  env: "dev",
  instrumentationKey: "",
  redirectUri: "https://app-scale-assessment-qa-web.azurewebsites.net/",
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
  apiUrl: "https://app-scale-assessment-qa-api.azurewebsites.net",
  cloudLabsApiBaseUrl: "https://api-qa.cloudlabs.ai/api/",
  //apiUrl: "https://localhost:44353",
};

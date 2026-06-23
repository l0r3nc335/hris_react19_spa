export const ROUTES = {
   public: {
      landing: '/',
      about: '/about',
      pricing: '/pricing',
      contactus: '/contact-us'
   },

   auth: {
      login: '/auth/login',
      register: '/auth/register',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
   },
   
   dashboard: {
      dashboard: '/dashboard',
      home: '/home'
   },
   
   people: {
      users: '/users',
   },
   
   /*
   time: {

   },

   pay: {

   }, 

   recruitment: {

   },

   performance: {

   },

   system: {

   }, 

   security: {

   }, 

   admin: {

   }*/

} as const
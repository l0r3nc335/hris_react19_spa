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
      verifyEmail: '/auth/verify-email',
      verify: '/auth/verify',
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
   
   system: {
      settings: '/settings',
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



   security: {

   }, 

   admin: {

   }*/

} as const

const KNOWN_ROUTE_PATHS = new Set<string>(
  Object.values(ROUTES).flatMap((group) => Object.values(group)),
)

export function isKnownRoute(pathname: string): boolean {
  const normalized = pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname
  return KNOWN_ROUTE_PATHS.has(normalized)
}
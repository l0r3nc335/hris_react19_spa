# 1. Project Structure

### Before layouts, decide your folders.

Example:

    src/
    ├── api/
    ├── app/
    ├── assets/
    ├── components/
    │   ├── ui/
    │   └── common/
    ├── features/
    ├── hooks/
    ├── layouts/
    ├── pages/
    ├── routes/
    ├── services/
    ├── store/
    ├── types/
    ├── utils/
    └── constants/


# 2. App Shell / Layouts

### Build the application's skeleton.

Example:

    GuestLayout
    ├── Header
    ├── Main Content
    └── Footer
    
    AuthenticatedLayout
    ├── Sidebar
    ├── Header
    ├── Content
    └── Footer

### lay-outing

    company logo
    navbar
    sidebar
    header
    footer
    responsive behavior

# 3. Routing FE

Example:

    /
    ├── Login
    ├── Register
    ├── Forgot Password
    
    /dashboard
    /users
    /roles
    /settings

Also:

    ProtectedRoute
    PublicRoute

# 4. Authentication Foundation

    login flow
    logout flow
    token storage
    axios interceptor
    route protection

Example:

    AuthSlice
    AuthService
    AuthAPI

# 5. Reusable UI Components

### Things that will be use in more than one place.

Example:

    Button
    Input
    Select
    Textarea
    Modal
    Dialog
    Drawer
    Table
    Badge
    Card
    LoadingSpinner
    EmptyState
    ErrorState

APP OWN THIS EXAMPLE FILE:

    components/ui/dropdown-menu.tsx

Inside it:

    Radix UI = behavior engine (logic)
    Tailwind classes = styling
    Your project = final authority

# 6. Global UI State

### Redux slices for UI only.

Examples:

    uiSlice
    ├── sidebarOpen
    ├── theme
    ├── notifications
    ├── loading
feature slices yet.

# 7. API Layer

Example:

    axios.ts
    
    services/
    ├── auth.service.ts
    ├── user.service.ts
    ├── role.service.ts

Common interceptors:

    Request Interceptor
    Response Interceptor
    401 Handler
    Token Refresh

# 8. TanStack Query Setup
### Create conventions.

Create conventions.

    features/
    └── users/
    ├── api/
    ├── hooks/
    ├── types/

Example:

    useUsersQuery()
    useCreateUserMutation()
    useUpdateUserMutation()

# 9. Feature Module Structure

### Start building actual business modules.

Example:

    features/
    └── users/
        ├── api/
        ├── hooks/
        ├── components/
        ├── pages/
        ├── schemas/
        └── types/

# 10. Forms + Validation

### After the screens exist:

    React Hook Form
    +
    Zod

for:

    Login
    User Create
    User Update
    Settings

# Recommended Order for Enterprise Project

    1. Folder Structure
    2. Layouts
    3. Routing
    4. Authentication Foundation
    5. Reusable UI Components
    6. Redux UI Slice
    7. Axios + Interceptors
    8. TanStack Query Setup
    9. Feature Modules
    10. Forms & Validation
    11. Testing
    12. Deployment

For a React + Redux Toolkit + TanStack Query + ShadCN enterprise application, Layouts → Routing → Authentication is usually the next thing after scaffolding. That gives the application a skeleton before you start creating reusable components and business features.   

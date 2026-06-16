# 1. Project Structure

### Before layouts, decide your folders.

Example:

    src/
    ├── app/              # App shell, providers
    ├── assets/
    ├── components/       # Shared app components (EntityListPage, dialogs, etc.)
    │   └── ui/           # Some shadcn-style pieces (e.g. form.tsx)
    ├── constants/
    ├── hooks/
    ├── layouts/          # AuthLayout, DashboardLayout
    ├── lib/              # queryClient, queryKeys
    ├── modules/          # Feature domains (NOT "features/" or top-level "pages/")
    │   ├── auth/pages/
    │   ├── employees/pages/
    │   ├── employees/hooks.ts
    │   └── ...
    ├── queries/          # TanStack Query hooks
    ├── routes/
    ├── services/         # HTTP client + api/* (not top-level "api/")
    │   └── api/
    ├── slices/           # Redux (auth)
    ├── store/
    ├── test/
    ├── types/
    ├── ui/               # Design system (Button, Modal, Dropdown, etc.)
    └── utils/


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

# 6. Jest + React Testing Library setup
### Start enforcing quality early before feature code grows.

What this covers:
    
    Unit testing
    Component testing
    Redux logic testing
    UI behavior testing (design system)

What can immediately test:

    Button, 
    Input,
    Modal, 
    etc. (design system) auth logic reducers

### Setup structure:
    test/
    ├── unit/
    │   ├── components/
    │   ├── hooks/
    │   ├── slices/
    │   └── utils/
    ├── setup/
    │   ├── jest.config.ts
    │   ├── setupTests.ts
    │   └── test-utils.tsx
    └── mocks/

Core idea:

    Tests should validate logic + UI behavior in isolation
    NOT full app flows


# 7. Global UI State

### Redux slices for UI only.

Examples:

    uiSlice
    ├── sidebarOpen
    ├── theme
    ├── notifications
    ├── loading
feature slices yet.

# 8. API Layer

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

# 9. TanStack Query Setup
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

# 10. Feature Module Structure

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

# 11. E2E Testing (Cypress)
### Start after real user flows exist in the application.

What this covers:

    Full login flow
    Protected routes
    CRUD workflows
    Navigation flows
    Form submissions
    API integration behavior (end-to-end)

### Recommended structure:

    cypress/
    ├── e2e/
    │   ├── auth/
    │   │   ├── login.cy.ts
    │   │   └── logout.cy.ts
    │   ├── users/
    │   │   ├── create-user.cy.ts
    │   │   ├── update-user.cy.ts
    │   │   └── delete-user.cy.ts
    │   └── navigation.cy.ts
    ├── fixtures/
    ├── support/
    │   ├── commands.ts
    │   └── e2e.ts
    └── config/

Core idea:

    Cypress tests should behave like real users
    NOT test implementation details


# 12. Forms + Validation

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
    6. Jest + React Testing Library setup
    7. Redux UI Slice
    8. Axios + Interceptors
    9. TanStack Query Setup
    10. Feature Modules
    11. E2E Testing (Cypress)
    12. Forms & Validation
    13. Testing
    14. Deployment

For a React + Redux Toolkit + TanStack Query + ShadCN enterprise application, Layouts → Routing → Authentication is usually the next thing after scaffolding. That gives the application a skeleton before you start creating reusable components and business features.   

# LIST PAGE
Info regarding list page that has the following.

    1. Data Table
    2. Data Table Toolbar - search records, Status drop down,  show delete check-box
    3. Search Records Collapsible
    4. Search Fields - for search records collapsible
    5. List Columns - for table column display

## Empty State
`src\components\EmptyState.tsx`

    Used to display when data table is empty or `No users found` where users is the entity of the current page. e.g: `/users` `/employee`


## Table Skeleton
`src\components\TableSkeleton.tsx`

    Used to display a loading skeleton of the Entity Data Table in a list page.

## Status Badge
`src\components\StatusBadge.tsx`

    Small capsule/div looking UI Used to display the status of a record in the table.

## Require Permission
`src\components\RequirePermission.tsx`

    Used to check if the current user have permission to a specific action it is used.

## Page Shell
`src\components\layout\PageShell.tsx`

    Container of the current page used to display Bread Crumbs, Page header, Page Content as children, and app footer

### Page header
`src\components\PageHeader.tsx` 

    Curent page header that contains Title and Description

### App Bread Crumbs
`src\components\layout\AppBreadcrumbs.tsx`

    Breadcrumbs of the current page, used for mobile and for web page view


### App Footer
`src\components\layout\AppFooter.tsx`

    Dashboard Footer

### Data Table Toolbar
`src\components\layout\DataTableToolBar.tsx`

    Use to search the table in FE level

### Pagination Table
`src\components\TablePagination.tsx`

    Prev Next pagination for ListPage Table


### Entity Types
`src\modules\users\pages\types.ts`

    Interface of Entity Fields

### Entity List Page
`src\components\EntityListPage.tsx`

    List page containing BE Search records card, table card, and DataTable toolbar

### Entity Form Dialog
`src\components\EntityFormDialog.tsx`

    Modal Form Dialog for editing or creating entity records


### Record Search panel/card
`src\components\RecordSearchPanel.tsx`

    Panel card that contains the search form.

### Search Fields
`src\types\searchFields.ts`

    Interface Entity Search fields used as search param

### Search Criteria
`src\utils\searchCriteria.ts`

    Search payload factory

### Form Fields
`src\constants\formFields.ts`

    Form field blueprints

### use Entity Crud Page
`src\hooks\useEntityCrudPage.ts`

    Hooks used to crud the entity

### API Client
`src\services\api\client.ts`

    Executes API method calls

### Person Name
`src\utils\personName.ts`

    used to parse person name

### Query Keys
`src\lib\queryKeys.ts`

    Key used to search records

### Endpoint Constant
`src\constants\endpoints.ts`

    Listings of endpoints

    
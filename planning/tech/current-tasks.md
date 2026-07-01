# AppSidebar Menu

## Add 2 clickable menu to the AppSidebar

    1. Dashboard [OK]
    2. Users [OK]
------------------------------------------------------------------------


# Users Page

## Add users table
    1. Gets users data from the the backend upon loading the page.  [OK] 
    2. search table in FE side, using the search bar provided.  [OK]

## Add search records
    1. Search records gets records from the backend using the given parameters.  [OK]

## Table actions
    1. Table actions per records  [OK]
    2. Table button - add records  [OK]

    Edit - Opens modal  [OK]
    Delete - soft delete with confirmation  [OK]
    Permanent Delete - this action is for soft deleted only.  [OK]
------------------------------------------------------------------------

# Refine Entity List Page

    Fix Toas BE error [OK]

------------------------------------------------------------------------

# Feature Entity Definitions
A. EntityListPage
B. EntityFormDialog

    A. /module/<feature>/pages/<Feature>ListPage.tsx
        1. /src/constants/formFields.ts
        2. /src/constants/permissions.ts     
    
    B. hooks.ts
        1. /queries/index.ts
        2. /queries/<feature>/queries
            a. /lib/queryKeys.ts
            b. /services/api/<feature>Api.ts
                i. /src/constants/endpoints.ts
                ii. /src/modules/<feature>/types.ts
                    a.i. /src/types/index.ts
                iii. src\types\searchFields.ts 
    
    C. /src/modules/<feature>/searchFields.ts       
       1. /src/types/searchFields.ts        
    
    D. /src/modules/<users>/listColumns.tsx




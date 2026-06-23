# Multi-Tenant Login Routing

#### Subscriber route

    Users: Company representative, and subscribers
    Purpose: Init subscription, manage subscription, billing and manage the portal
    
    url: hrsystem.com/auth/login, with default enabled 2fa authentication via email.

        -if a non scubscriber with valid tenant email is loging in, send email that a user is trying to login without company-code
            if the legitimate tenant is this, click its me. redirect to dashboard(authenticated), with expiry
                if expired, login

        -forgot password - non subscriber do nothing
        -forgot password - susbcriber send email

#### Tenant-Workspace route

    Users: Company employees, and workspace admin
    Purpose: HRIS operations

    url: hrsystem.com/auth/login&company-code=534534tdfgdfg345fgcbvb
        -valid user creds - allow login
        -

#### Control panel route

    Users: vendor support, developer, company
    Purpose: manage tenant concerns, subcsriptions, support, development and monitoring
    




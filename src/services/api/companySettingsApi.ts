import { createWorkforceResourceApi, workforceGetData, workforcePutData, workforcePostData } from '@/services/api/workforceApi'
import { ROUTES } from '@/constants/routes'

export interface NamedSettingEntity {
  id: string
  name: string
  code?: string | null
  description?: string | null
  is_active?: boolean
  status?: string
  amount?: string | number
  frequency?: string
  min_rate?: string | number
  max_rate?: string | number
}

export interface CompanyProfile {
  id: string
  name: string
  legal_name?: string | null
  trading_name?: string | null
  abn?: string | null
  timezone?: string
  locale?: string
  legalName?: string | null
  tradingName?: string | null
}

export interface CompanyOnboardingModule {
  id: string
  key: string
  label: string
  completed: boolean
  path?: string
}

export interface CompanyOnboardingStatus {
  modules: CompanyOnboardingModule[]
  completedCount: number
  totalCount: number
}

const MODULE_PATHS: Record<string, string> = {
  company_profile: ROUTES.companySettings.profile,
  roles_users: ROUTES.companySettings.roles,
  permissions: ROUTES.companySettings.roles,
  divisions: ROUTES.companySettings.divisions,
  groups: ROUTES.companySettings.groups,
  locations: ROUTES.companySettings.locations,
  position_title: ROUTES.companySettings.profile,
  employment_basis: ROUTES.companySettings.employmentBasis,
  classifications: ROUTES.companySettings.classifications,
  pay_rates: ROUTES.companySettings.payRates,
  allowances: ROUTES.companySettings.allowances,
  email_activity: ROUTES.companySettings.hub,
  vaccinations: ROUTES.companySettings.vaccinationTypes,
  certifications: ROUTES.companySettings.certificationTypes,
}

export async function fetchCompanyOnboarding(): Promise<CompanyOnboardingStatus> {
  const data = await workforceGetData<{
    steps: Array<{
      moduleSlug: string
      label: string
      completed: boolean
      sortOrder: number
    }>
    completedCount: number
    totalCount: number
  }>('/company/onboarding-status')

  return {
    modules: data.steps.map((s) => ({
      id: s.moduleSlug,
      key: s.moduleSlug,
      label: s.label,
      completed: s.completed,
      path: MODULE_PATHS[s.moduleSlug],
    })),
    completedCount: data.completedCount,
    totalCount: data.totalCount,
  }
}

export async function fetchCompanyProfile(): Promise<CompanyProfile | null> {
  try {
    const row = await workforceGetData<CompanyProfile>('/company')
    return {
      ...row,
      id: String(row.id),
      legalName: row.legal_name ?? row.legalName,
      tradingName: row.trading_name ?? row.tradingName,
    }
  } catch {
    return null
  }
}

export async function updateCompanyProfile(body: Record<string, unknown>): Promise<CompanyProfile> {
  return workforcePutData<CompanyProfile>('/company', body)
}

export async function markCompanySettingComplete(moduleSlug: string): Promise<void> {
  await workforcePostData(`/company/setting-completions/${moduleSlug}/complete`)
}

export const companyDivisionsApi = createWorkforceResourceApi<NamedSettingEntity>('/divisions')
export const companyGroupsApi = createWorkforceResourceApi<NamedSettingEntity>('/groups')
export const companyLocationsApi = createWorkforceResourceApi<NamedSettingEntity>('/locations')
export const companyEmploymentBasisApi = createWorkforceResourceApi<NamedSettingEntity>('/employment-bases')
export const companyClassificationsApi = createWorkforceResourceApi<NamedSettingEntity>('/pay-classifications')
export const companyPayRatesApi = createWorkforceResourceApi<NamedSettingEntity>('/pay-rate-types')
export const companyAllowancesApi = createWorkforceResourceApi<NamedSettingEntity>('/allowances')
export const companyVaccinationTypesApi = createWorkforceResourceApi<NamedSettingEntity>('/vaccination-types')
export const companyCertificationTypesApi = createWorkforceResourceApi<NamedSettingEntity>('/certification-types')

export const employeesApi = createWorkforceResourceApi('/employees')
export const leaveRequestsApi = createWorkforceResourceApi('/leave-requests')
export const leaveTypesApi = createWorkforceResourceApi('/leave-types')
export const pdTemplatesApi = createWorkforceResourceApi('/pd-templates')
export const pdAssignmentsApi = createWorkforceResourceApi('/pd-assignments')
export const documentTemplatesApi = createWorkforceResourceApi('/document-templates')
export const employeeDocumentsApi = createWorkforceResourceApi('/employee-documents')
export const timesheetsApi = createWorkforceResourceApi('/timesheets')
export const rosterShiftsApi = createWorkforceResourceApi('/roster-shifts')
export const shiftTypesApi = createWorkforceResourceApi('/shift-types')
export const employeeVaccinationsApi = createWorkforceResourceApi('/employee-vaccinations')
export const vaccinationExemptionsApi = createWorkforceResourceApi('/vaccination-exemptions')
export const complianceTypesApi = createWorkforceResourceApi('/compliance-types')
export const employeeCompliancesApi = createWorkforceResourceApi('/employee-compliances')
export const employeeCertificationsApi = createWorkforceResourceApi('/employee-certifications')
export const travelLogsApi = createWorkforceResourceApi('/travel-logs')
export const vehiclesApi = createWorkforceResourceApi('/vehicles')
export const resourcesApi = createWorkforceResourceApi('/resources')
export const payslipsApi = createWorkforceResourceApi('/payslips')
export const notificationsApi = createWorkforceResourceApi('/notifications')

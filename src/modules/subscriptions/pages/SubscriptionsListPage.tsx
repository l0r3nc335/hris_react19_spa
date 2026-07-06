import { useState } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { RecordSearchPanel } from '@/components/RecordSearchPanel'
import { PERMISSIONS } from '@/constants/permissions'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import { useRecordSearchList } from '@/hooks/useRecordSearchList'
import { queryKeys } from '@/lib/queryKeys'
import { searchSubscriptions, subscriptionsApi } from '@/services/api/subscriptionsApi'
import {
  useCreateSubscription,
  useUpdateSubscription,
  useSoftDeleteSubscription,
  useRestoreSubscription,
  useRemoveSubscription,
  useSubscriptionsList,
  useSubscriptionsTrashedList,
} from '../hooks'
import { SUBSCRIPTION_FORM_FIELDS } from '../formFields'
import { SUBSCRIPTION_SEARCH_FIELDS } from '../searchFields'
import { SUBSCRIPTION_LIST_COLUMNS } from '../listColumns'

export function SubscriptionsListPage(): React.JSX.Element {
  const [showDeleted, setShowDeleted] = useState(false)

  // "Search records" collapsible — POSTs non-empty field values to /subscriptions/search.
  const recordSearch = useRecordSearchList({
    fields: SUBSCRIPTION_SEARCH_FIELDS,
    listFn: subscriptionsApi.list,
    trashedListFn: subscriptionsApi.listTrashed,
    searchFn: searchSubscriptions,
    queryKeyPrefix: queryKeys.subscriptions.all,
    fetchDefaultList: false,
    showDeleted,
    onShowDeletedChange: setShowDeleted,
  })

  const beSearchActive = recordSearch.isSearchActive

  const crud = useEntityCrudPage({
    title: 'Subscriptions',
    description: 'Manage subscription plans',
    emptyTitle: 'No subscriptions found',
    entitySingular: 'subscription',
    formFields: SUBSCRIPTION_FORM_FIELDS,
    createPermission: PERMISSIONS.subscriptionsWrite,
    writePermission: PERMISSIONS.subscriptionsWrite,
    clientSideFilter: !beSearchActive,
    showDeleted,
    onShowDeletedChange: setShowDeleted,
    listSource: beSearchActive ? recordSearch.listSource : undefined,
    hooks: {
      useList: useSubscriptionsList,
      useTrashedList: useSubscriptionsTrashedList,
      useCreate: useCreateSubscription,
      useUpdate: useUpdateSubscription,
      useSoftDelete: useSoftDeleteSubscription,
      useRestore: useRestoreSubscription,
      useRemove: useRemoveSubscription,
    },
  })

  return (
    <>
      <EntityListPage
        {...crud.listPageProps}
        headerContent={<RecordSearchPanel {...recordSearch.searchPanelProps} />}
        clientSideSort
        hideNameColumn
        extraColumns={SUBSCRIPTION_LIST_COLUMNS}
        searchKeys={[
          'name',
          'slug',
          'billingInterval',
          'price',
          'currency',
          'description',
          'status',
        ]}
      />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </>
  )
}
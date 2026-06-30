import { useState } from 'react'
import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { RecordSearchPanel } from '@/components/RecordSearchPanel'
import { EMAIL_FIELD } from '@/constants/formFields'
import { PERMISSIONS } from '@/constants/permissions'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import { useRecordSearchList } from '@/hooks/useRecordSearchList'
import { queryKeys } from '@/lib/queryKeys'
import { searchUsers, usersApi } from '@/services/api/usersApi'
import {
  useCreateUser,
  useUpdateUser,
  useSoftDeleteUser,
  useRestoreUser,
  useRemoveUser,
  useUsersList,
  useUsersTrashedList,
} from '../hooks'
import { USER_SEARCH_FIELDS } from '../searchFields'
import { USER_LIST_COLUMNS } from '../listColumns'

export function UsersListPage(): React.JSX.Element {
  const [showDeleted, setShowDeleted] = useState(false)

  // "Search records" collapsible — POSTs non-empty field values to /users/search.
  const recordSearch = useRecordSearchList({
    fields: USER_SEARCH_FIELDS,
    listFn: usersApi.list,
    trashedListFn: usersApi.listTrashed,
    searchFn: searchUsers,
    queryKeyPrefix: queryKeys.users.all,
    fetchDefaultList: false,
    showDeleted,
    onShowDeletedChange: setShowDeleted,
  })

  const beSearchActive = recordSearch.isSearchActive

  // Default table data from list API; BE search results replace rows when panel search is active.
  const crud = useEntityCrudPage({
    title: 'Users',
    description: 'Manage user accounts',
    emptyTitle: 'No users found',
    entitySingular: 'user',
    nameFields: 'split',
    formFields: [EMAIL_FIELD],
    createPermission: PERMISSIONS.usersWrite,
    writePermission: PERMISSIONS.usersWrite,
    clientSideFilter: !beSearchActive,
    showDeleted,
    onShowDeletedChange: setShowDeleted,
    listSource: beSearchActive ? recordSearch.listSource : undefined,
    hooks: {
      useList: useUsersList,
      useTrashedList: useUsersTrashedList,
      useCreate: useCreateUser,
      useUpdate: useUpdateUser,
      useSoftDelete: useSoftDeleteUser,
      useRestore: useRestoreUser,
      useRemove: useRemoveUser,
    },
  })

  return (
    <>
      <EntityListPage
        {...crud.listPageProps}
        headerContent={<RecordSearchPanel {...recordSearch.searchPanelProps} />}
        clientSideSort
        hideNameColumn
        extraColumns={USER_LIST_COLUMNS}
        searchKeys={['firstName', 'lastName', 'email', 'role', 'status']}
      />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </>
  )
}

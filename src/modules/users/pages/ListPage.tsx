import { EntityListPage } from '@/components/EntityListPage'
import { EntityFormDialog } from '@/components/EntityFormDialog'
import { ConfirmDialog } from '@/components/ConfirmDialog'
import { EMAIL_FIELD } from '@/constants/formFields'
import { PERMISSIONS } from '@/constants/permissions'
import { useEntityCrudPage } from '@/hooks/useEntityCrudPage'
import {
  useUsersList,
  useUsersTrashedList,
  useCreateUser,
  useUpdateUser,
  useSoftDeleteUser,
  useRestoreUser,
  useRemoveUser,
} from '../hooks'

export function UsersListPage(): React.JSX.Element {
  const crud = useEntityCrudPage({
    title: 'Users',
    description: 'Manage user accounts',
    emptyTitle: 'No users found',
    entitySingular: 'user',
    nameFields: 'split',
    formFields: [EMAIL_FIELD],
    createPermission: PERMISSIONS.usersWrite,
    writePermission: PERMISSIONS.usersWrite,
    searchKeys: ['name', 'firstName', 'lastName', 'status'],
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
      <EntityListPage {...crud.listPageProps} />
      <EntityFormDialog {...crud.formDialogProps} />
      <ConfirmDialog {...crud.confirmDialogProps} />
    </>
  )
}

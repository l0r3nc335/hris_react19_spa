import { useEffect, useState } from 'react'
import type { EntityFormValues, FormFieldConfig } from '@/components/EntityFormDialog'
import type { EntityListPageProps } from '@/components/EntityListPage'
import type { ConfirmDialogProps } from '@/components/ConfirmDialog'
import type { CreateBody, UpdateBody, ListQueryParams } from '@/services/api/client'
import type { Permission } from '@/constants/permissions'
import type { PaginatedListQueryResult } from '@/queries/factory'
import { resolveSplitNameFields } from '@/utils/personName'

interface EntityListItem {
  id: string
  name: string
  status: string
  firstName?: string
  lastName?: string
}

interface MutationHookResult<TVariables> {
  mutate: (variables: TVariables) => void
  isPending: boolean
}

export interface EntityCrudHooks {
  useList: (params?: ListQueryParams) => PaginatedListQueryResult<EntityListItem>
  useTrashedList: (params?: ListQueryParams) => PaginatedListQueryResult<EntityListItem>
  useCreate: () => MutationHookResult<CreateBody>
  useUpdate: () => MutationHookResult<{ id: string; body: UpdateBody }>
  useSoftDelete: () => MutationHookResult<string>
  useRestore: () => MutationHookResult<string>
  useRemove: () => MutationHookResult<string>
}

export interface UseEntityCrudPageConfig {
  title: string
  description: string
  emptyTitle: string
  entitySingular: string
  readOnly?: boolean
  formFields?: FormFieldConfig[]
  statusOptions?: import('@/ui/Select').SelectOption[]
  /** When 'split', the form uses first name / last name fields and sends them to the API. */
  nameFields?: 'single' | 'split'
  createPermission?: Permission
  writePermission?: Permission
  searchKeys?: string[]
  /** When true (default), search and status filter run in the browser; show-deleted still uses the API. */
  clientSideFilter?: boolean
  hooks: EntityCrudHooks | (Pick<EntityCrudHooks, 'useList'> & Partial<Omit<EntityCrudHooks, 'useList'>>)
}

type ConfirmAction = 'softDelete' | 'hardDelete' | 'restore'

export interface UseEntityCrudPageResult {
  listPageProps: EntityListPageProps
  formDialogProps: {
    open: boolean
    onOpenChange: (open: boolean) => void
    mode: 'create' | 'edit'
    title: string
    initialValues?: EntityFormValues
    onSubmit: (data: EntityFormValues) => void
    isPending: boolean
    formFields?: FormFieldConfig[]
    statusOptions?: import('@/ui/Select').SelectOption[]
    nameFields?: 'single' | 'split'
  }
  confirmDialogProps: ConfirmDialogProps
}

export function useEntityCrudPage(config: UseEntityCrudPageConfig): UseEntityCrudPageResult {
  const {
    title,
    description,
    emptyTitle,
    entitySingular,
    readOnly = false,
    formFields = [],
    statusOptions,
    nameFields = 'single',
    createPermission,
    writePermission,
    searchKeys,
    clientSideFilter = true,
  } = config
  const [showDeleted, setShowDeleted] = useState(false)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [formOpen, setFormOpen] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [editingItem, setEditingItem] = useState<EntityListItem | null>(null)
  const [confirmAction, setConfirmAction] = useState<{
    action: ConfirmAction
    id: string
  } | null>(null)

  const listParams: ListQueryParams = clientSideFilter
    ? { page: 1, limit: 100 }
    : {
        page,
        limit,
        q: searchQuery.trim() || undefined,
        status: statusFilter,
      }

  const activeQuery = config.hooks.useList(listParams)
  const trashedQuery = config.hooks.useTrashedList?.(listParams) ?? {
    data: undefined,
    meta: undefined,
    isLoading: false,
  }
  const createMutation = config.hooks.useCreate?.() ?? { mutate: () => undefined, isPending: false }
  const updateMutation = config.hooks.useUpdate?.() ?? { mutate: () => undefined, isPending: false }
  const softDeleteMutation = config.hooks.useSoftDelete?.() ?? { mutate: () => undefined, isPending: false }
  const restoreMutation = config.hooks.useRestore?.() ?? { mutate: () => undefined, isPending: false }
  const removeMutation = config.hooks.useRemove?.() ?? { mutate: () => undefined, isPending: false }

  useEffect(() => {
    setPage(1)
  }, [searchQuery, statusFilter, showDeleted])

  const items = (showDeleted ? trashedQuery.data : activeQuery.data) ?? []
  const isLoading = showDeleted ? trashedQuery.isLoading : activeQuery.isLoading
  const apiTotal = showDeleted ? trashedQuery.meta?.total ?? 0 : activeQuery.meta?.total ?? 0

  const openCreate = (): void => {
    setFormMode('create')
    setEditingItem(null)
    setFormOpen(true)
  }

  const openEdit = (item: EntityListItem): void => {
    setFormMode('edit')
    setEditingItem(item)
    setFormOpen(true)
  }

  const toApiBody = (data: EntityFormValues): CreateBody & UpdateBody => {
    const body: CreateBody & UpdateBody = {
      status: data.status ?? 'active',
    }
    if (nameFields === 'split') {
      body.firstName = data.firstName
      body.lastName = data.lastName
    } else {
      body.name = data.name
    }
    for (const field of formFields) {
      const value = data[field.key]
      if (value) body[field.key] = value
    }
    return body
  }

  const handleFormSubmit = (data: EntityFormValues): void => {
    const body = toApiBody(data)
    if (formMode === 'create') {
      createMutation.mutate(body)
      return
    }
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, body })
    }
  }

  const handleConfirm = (): void => {
    if (!confirmAction) return
    const { action, id } = confirmAction
    if (action === 'softDelete') {
      softDeleteMutation.mutate(id)
    } else if (action === 'restore') {
      restoreMutation.mutate(id)
    } else {
      removeMutation.mutate(id)
    }
    setConfirmAction(null)
  }

  const confirmCopy: Record<
    ConfirmAction,
    { title: string; description: string; confirmLabel: string; destructive: boolean }
  > = {
    softDelete: {
      title: `Delete ${entitySingular}?`,
      description: `This will move the ${entitySingular} to trash. You can restore it later.`,
      confirmLabel: 'Soft delete',
      destructive: false,
    },
    hardDelete: {
      title: `Permanently delete ${entitySingular}?`,
      description: `This action cannot be undone. The ${entitySingular} will be permanently removed.`,
      confirmLabel: 'Permanently delete',
      destructive: true,
    },
    restore: {
      title: `Restore ${entitySingular}?`,
      description: `This will restore the ${entitySingular} from trash.`,
      confirmLabel: 'Restore',
      destructive: false,
    },
  }

  const pendingConfirm =
    confirmAction?.action === 'softDelete'
      ? softDeleteMutation.isPending
      : confirmAction?.action === 'restore'
        ? restoreMutation.isPending
        : removeMutation.isPending

  const activeConfirm = confirmAction ? confirmCopy[confirmAction.action] : null

  return {
    listPageProps: {
      title,
      description,
      emptyTitle: showDeleted ? `No deleted ${entitySingular}s found` : emptyTitle,
      items,
      isLoading,
      total: clientSideFilter ? undefined : apiTotal,
      page,
      limit,
      onPageChange: setPage,
      onLimitChange: (nextLimit) => {
        setLimit(nextLimit)
        setPage(1)
      },
      searchValue: searchQuery,
      onSearchChange: setSearchQuery,
      statusFilter,
      onStatusFilterChange: setStatusFilter,
      clientSideFilter,
      showDeleted,
      onShowDeletedChange: readOnly ? undefined : setShowDeleted,
      onCreate: readOnly ? undefined : openCreate,
      onEdit: readOnly || showDeleted ? undefined : openEdit,
      onSoftDelete:
        readOnly || showDeleted
          ? undefined
          : (id) => setConfirmAction({ action: 'softDelete', id }),
      onHardDelete: readOnly
        ? undefined
        : (id) => setConfirmAction({ action: 'hardDelete', id }),
      onRestore:
        readOnly || !showDeleted
          ? undefined
          : (id) => setConfirmAction({ action: 'restore', id }),
      showActions: !readOnly,
      isTrashedView: showDeleted,
      createPermission,
      writePermission,
      searchKeys,
    },
    formDialogProps: {
      open: formOpen,
      onOpenChange: setFormOpen,
      mode: formMode,
      title: formMode === 'create' ? `Create ${entitySingular}` : `Edit ${entitySingular}`,
      initialValues: editingItem
        ? nameFields === 'split'
          ? {
              ...resolveSplitNameFields(editingItem),
              status: editingItem.status,
              ...Object.fromEntries(
                formFields.map((field) => [
                  field.key,
                  String((editingItem as unknown as Record<string, unknown>)[field.key] ?? ''),
                ]),
              ),
            }
          : {
              name: editingItem.name,
              status: editingItem.status,
              ...Object.fromEntries(
                formFields.map((field) => [
                  field.key,
                  String((editingItem as unknown as Record<string, unknown>)[field.key] ?? ''),
                ]),
              ),
            }
        : undefined,
      onSubmit: handleFormSubmit,
      isPending:
        formMode === 'create' ? createMutation.isPending : updateMutation.isPending,
      formFields,
      statusOptions,
      nameFields,
    },
    confirmDialogProps: {
      open: confirmAction !== null,
      onOpenChange: (open) => {
        if (!open) setConfirmAction(null)
      },
      title: activeConfirm?.title ?? '',
      description: activeConfirm?.description ?? '',
      confirmLabel: activeConfirm?.confirmLabel,
      destructive: activeConfirm?.destructive,
      onConfirm: handleConfirm,
      isPending: pendingConfirm,
    },
  }
}

import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { RecordSearchPanelProps } from '@/components/RecordSearchPanel'
import type { ListQueryParams } from '@/services/api/client'
import type { Paginated } from '@/types/api'
import type { SearchFieldConfig } from '@/types/searchFields'
import {
  buildSearchPayload,
  createEmptySearchValues,
  type SearchFormValues,
} from '@/utils/searchCriteria'

export interface RecordSearchListSource<T extends { id: string }> {
  items: T[]
  isLoading: boolean
  total: number
  page: number
  limit: number
  showDeleted: boolean
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
  onShowDeletedChange: (show: boolean) => void
}

export interface UseRecordSearchListConfig<T extends { id: string }> {
  fields: SearchFieldConfig[]
  listFn: (params?: ListQueryParams) => Promise<Paginated<T>>
  trashedListFn: (params?: ListQueryParams) => Promise<Paginated<T>>
  searchFn: (
    criteria: Record<string, string | number | boolean>,
    options: { trashed?: boolean },
  ) => Promise<Paginated<T>>
  queryKeyPrefix: readonly unknown[]
  /** When false, only BE search queries run; default list fetching is skipped. */
  fetchDefaultList?: boolean
  showDeleted?: boolean
  onShowDeletedChange?: (show: boolean) => void
}

export interface UseRecordSearchListResult<T extends { id: string }> {
  listSource: RecordSearchListSource<T>
  searchPanelProps: RecordSearchPanelProps
  isSearchActive: boolean
}

function buildSearchQueryKey(
  queryKeyPrefix: readonly unknown[],
  criteria: Record<string, string | number | boolean>,
  showDeleted: boolean,
  page: number,
  limit: number,
): readonly unknown[] {
  return [...queryKeyPrefix, 'search', criteria, showDeleted, page, limit]
}

export function useRecordSearchList<T extends { id: string }>(
  config: UseRecordSearchListConfig<T>,
): UseRecordSearchListResult<T> {
  const {
    fields,
    listFn,
    trashedListFn,
    searchFn,
    queryKeyPrefix,
    fetchDefaultList = true,
    showDeleted: showDeletedProp,
    onShowDeletedChange,
  } = config

  const queryClient = useQueryClient()
  const [showDeletedInternal, setShowDeletedInternal] = useState(false)
  const showDeleted = showDeletedProp ?? showDeletedInternal
  const setShowDeleted = onShowDeletedChange ?? setShowDeletedInternal
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [draftValues, setDraftValues] = useState<SearchFormValues>(() =>
    createEmptySearchValues(fields),
  )
  const [submittedCriteria, setSubmittedCriteria] = useState<Record<
    string,
    string | number | boolean
  > | null>(null)
  const [searchActive, setSearchActive] = useState(false)

  const listParams: ListQueryParams = { page, limit }

  const defaultQuery = useQuery({
    queryKey: [...queryKeyPrefix, 'list', showDeleted, listParams],
    queryFn: () => (showDeleted ? trashedListFn(listParams) : listFn(listParams)),
    enabled: fetchDefaultList && !searchActive,
  })

  const searchQuery = useQuery({
    queryKey: buildSearchQueryKey(
      queryKeyPrefix,
      submittedCriteria ?? {},
      showDeleted,
      page,
      limit,
    ),
    queryFn: () =>
      searchFn(
        { ...(submittedCriteria ?? {}), page, limit },
        { trashed: showDeleted },
      ),
    enabled: searchActive && submittedCriteria !== null,
  })

  useEffect(() => {
    setPage(1)
  }, [showDeleted])

  const activeQuery = searchActive ? searchQuery : defaultQuery

  const items = activeQuery.data?.data ?? []
  const isLoading = activeQuery.isFetching
  const total = activeQuery.data?.meta.total ?? 0

  const handleChange = (key: string, value: string): void => {
    setDraftValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearch = (): void => {
    const payload = buildSearchPayload(draftValues, fields)
    const nextPage = 1

    setSubmittedCriteria(payload)
    setSearchActive(true)
    setPage(nextPage)

    void queryClient.fetchQuery({
      queryKey: buildSearchQueryKey(queryKeyPrefix, payload, showDeleted, nextPage, limit),
      queryFn: () => searchFn({ ...payload, page: nextPage, limit }, { trashed: showDeleted }),
    })
  }

  const handleClear = (): void => {
    setDraftValues(createEmptySearchValues(fields))
    setSubmittedCriteria(null)
    setSearchActive(false)
    setPage(1)
    queryClient.removeQueries({ queryKey: [...queryKeyPrefix, 'search'] })
  }

  const searchPanelProps: RecordSearchPanelProps = {
    fields,
    values: draftValues,
    onChange: handleChange,
    onSearch: handleSearch,
    onClear: handleClear,
    isSearching: isLoading,
  }

  return {
    listSource: {
      items,
      isLoading,
      total,
      page,
      limit,
      showDeleted,
      onPageChange: setPage,
      onLimitChange: (nextLimit) => {
        setLimit(nextLimit)
        setPage(1)
      },
      onShowDeletedChange: setShowDeleted,
    },
    searchPanelProps,
    isSearchActive: searchActive,
  }
}

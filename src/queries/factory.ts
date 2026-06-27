import {
    queryOptions,
    useMutation,
    useQuery,
    useQueryClient,
    type QueryKey,
  } from '@tanstack/react-query'
  import { toast } from 'sonner'
  import type {
    CreateBody,
    UpdateBody,
    MutableResourceApi,
    ListQueryParams,
  } from '@/services/api/client'
  import type { Paginated, PaginatedMeta } from '@/types/api'
  
  export interface ListResourceApi<T> {
    list: (params?: ListQueryParams) => Promise<Paginated<T>>
    listTrashed: (params?: ListQueryParams) => Promise<Paginated<T>>
    getById: (id: string) => Promise<T>
    create: (body: CreateBody) => Promise<T>
    update: (id: string, body: UpdateBody) => Promise<T>
    remove: (id: string) => Promise<{ id: string; deleted: boolean }>
    softDelete: (id: string) => Promise<T>
    restore: (id: string) => Promise<T>
    deactivate?: (id: string) => Promise<T>
  }
  
  export interface PaginatedListQueryResult<T> {
    data: T[] | undefined
    meta: PaginatedMeta | undefined
    isLoading: boolean
  }
  
  export function createListQueryOptions<T>(
    queryKey: QueryKey,
    listFn: () => Promise<T[]>,
  ) {
    return queryOptions({
      queryKey,
      queryFn: listFn,
    })
  }
  
  export function useFlatListQuery<T>(queryKey: QueryKey, listFn: () => Promise<T[]>) {
    return useQuery(createListQueryOptions(queryKey, listFn))
  }
  
  export function usePaginatedListQuery<T>(
    queryKey: QueryKey,
    listFn: (params?: ListQueryParams) => Promise<Paginated<T>>,
    params?: ListQueryParams,
  ): PaginatedListQueryResult<T> {
    const query = useQuery({
      queryKey: [...(Array.isArray(queryKey) ? queryKey : [queryKey]), params],
      queryFn: () => listFn(params),
    })
  
    return {
      data: query.data?.data,
      meta: query.data?.meta,
      isLoading: query.isLoading,
    }
  }
  
  export function useCreateMutation<T extends { id: string }>(
    allKey: QueryKey,
    _listKey: QueryKey,
    api: Pick<ListResourceApi<T>, 'create'>,
  ) {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: api.create,
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: allKey })
        toast.success('Created successfully')
      },
    })
  }
  
  export function useUpdateMutation<T extends { id: string }>(
    allKey: QueryKey,
    api: Pick<ListResourceApi<T>, 'update'>,
  ) {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ id, body }: { id: string; body: UpdateBody }) => api.update(id, body),
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: allKey })
        toast.success('Updated successfully')
      },
    })
  }
  
  export function useRemoveMutation(
    allKey: QueryKey,
    api: Pick<ListResourceApi<unknown>, 'remove'>,
  ) {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: api.remove,
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: allKey })
        toast.success('Permanently deleted')
      },
    })
  }
  
  export function useSoftDeleteMutation<T extends { id: string; status: string }>(
    allKey: QueryKey,
    softDeleteFn: (id: string) => Promise<T>,
  ) {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: softDeleteFn,
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: allKey })
        const previousEntries = queryClient.getQueriesData<Paginated<T>>({ queryKey: allKey })
        queryClient.setQueriesData<Paginated<T>>({ queryKey: allKey }, (old) => {
          if (!old?.data) return old
          return {
            ...old,
            data: old.data.map((e) => (e.id === id ? { ...e, status: 'deleted' } : e)),
          }
        })
        return { previousEntries }
      },
      onError: (_err, _id, context) => {
        context?.previousEntries?.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      },
      onSettled: () => {
        void queryClient.invalidateQueries({ queryKey: allKey })
      },
      onSuccess: () => {
        toast.success('Moved to trash')
      },
    })
  }
  
  export function useRestoreMutation<T extends { id: string }>(
    allKey: QueryKey,
    restoreFn: (id: string) => Promise<T>,
  ) {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: restoreFn,
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: allKey })
        toast.success('Restored successfully')
      },
    })
  }
  
  export function useDeactivateMutation<T extends { id: string; status: string }>(
    allKey: QueryKey,
    deactivateFn: (id: string) => Promise<T>,
  ) {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: deactivateFn,
      onMutate: async (id) => {
        await queryClient.cancelQueries({ queryKey: allKey })
        const previousEntries = queryClient.getQueriesData<Paginated<T>>({ queryKey: allKey })
        queryClient.setQueriesData<Paginated<T>>({ queryKey: allKey }, (old) => {
          if (!old?.data) return old
          return {
            ...old,
            data: old.data.map((e) => (e.id === id ? { ...e, status: 'inactive' } : e)),
          }
        })
        return { previousEntries }
      },
      onError: (_err, _id, context) => {
        context?.previousEntries?.forEach(([key, data]) => {
          queryClient.setQueryData(key, data)
        })
      },
      onSettled: () => {
        void queryClient.invalidateQueries({ queryKey: allKey })
      },
      onSuccess: () => {
        toast.success('Deactivated successfully')
      },
    })
  }
  
  export function createResourceQueryHooks<T extends { id: string; status: string }>(
    keys: {
      all: QueryKey
      list: () => QueryKey
      trashed: () => QueryKey
    },
    api: MutableResourceApi<T>,
  ) {
    return {
      useList: (params?: ListQueryParams) =>
        usePaginatedListQuery([...keys.list(), params], () => api.list(params)),
      useTrashedList: (params?: ListQueryParams) =>
        usePaginatedListQuery([...keys.trashed(), params], () => api.listTrashed(params)),
      useCreate: () => useCreateMutation(keys.all, keys.list(), api),
      useUpdate: () => useUpdateMutation(keys.all, api),
      useSoftDelete: () => useSoftDeleteMutation(keys.all, api.softDelete),
      useRestore: () => useRestoreMutation(keys.all, api.restore),
      useRemove: () => useRemoveMutation(keys.all, api),
    }
  }
  
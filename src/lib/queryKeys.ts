export const queryKeys = {
    users: {
      all: ['users'] as const,
      list: () => [...queryKeys.users.all, 'list'] as const,
      trashed: () => [...queryKeys.users.all, 'trashed'] as const,
    },
} as const
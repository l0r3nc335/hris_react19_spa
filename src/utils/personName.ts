export function parsePersonName(name: string): { firstName: string; lastName: string } {
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: '' }
    }
    return {
      firstName: parts[0],
      lastName: parts.slice(1).join(' '),
    }
  }
  
  export function resolveSplitNameFields(item: {
    name: string
    firstName?: string
    lastName?: string
  }): { firstName: string; lastName: string } {
    if (item.firstName?.trim() || item.lastName?.trim()) {
      return {
        firstName: item.firstName ?? '',
        lastName: item.lastName ?? '',
      }
    }
    return parsePersonName(item.name)
  }
  
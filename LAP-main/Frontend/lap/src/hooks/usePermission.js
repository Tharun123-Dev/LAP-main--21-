import { useSelector } from 'react-redux'

const normalizeCodes = (codes) => {
  if (!codes) return []
  return Array.isArray(codes) ? codes : [codes]
}

const usePermission = () => {
  const auth = useSelector((state) => state.auth)
  const permissions = auth.permissions || []
  const role = auth.role || 'Frontend Preview'
  const hasToken = Boolean(auth.access || localStorage.getItem('access'))
  const isPreviewMode = !hasToken && permissions.length === 0
  const hasFullAccess = isPreviewMode || permissions.includes('*') || role?.toLowerCase() === 'admin'

  const can = (code) => {
    if (hasFullAccess || !code) return true
    return permissions.includes(code)
  }

  const canAny = (codes) => {
    const list = normalizeCodes(codes)
    if (hasFullAccess || list.length === 0) return true
    return list.some((code) => permissions.includes(code))
  }

  const canAll = (codes) => {
    const list = normalizeCodes(codes)
    if (hasFullAccess || list.length === 0) return true
    return list.every((code) => permissions.includes(code))
  }

  return { can, canAny, canAll, permissions, role, hasFullAccess, isPreviewMode }
}

export default usePermission

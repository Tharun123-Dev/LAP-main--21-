import { useSelector } from 'react-redux'

const usePermission = () => {
  const permissions = useSelector((s) => s.auth.permissions || [])
  const role        = useSelector((s) => s.auth.role)
  const user        = useSelector((s) => s.auth.user)
  const name        = useSelector((s) => s.auth.name)

  const hasFullAccess = role === 'Super Admin' || user === 'Admin' || name === 'Admin' || permissions.includes('*')

  const can    = (code)   => hasFullAccess || permissions.includes(code)
  const canAny = (codes)  => codes.some(can)
  const canAll = (codes)  => codes.every(can)

  return { can, canAny, canAll, permissions, role, hasFullAccess }
}

export default usePermission

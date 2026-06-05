import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const EmptyPermissionView = () => (
  <div className="min-h-[50vh]" aria-label="No content available" />
)

const ProtectedRoute = ({ children, requiredPermission, requiredAny }) => {
  const { access, permissions = [], role, name, user } = useSelector((s) => s.auth)

  if (!access) return <Navigate to="/login" replace />

  const hasFullAccess =
    role === 'Super Admin' ||
    name === 'Admin' ||
    user === 'Admin' ||
    permissions.includes('*')

  if (requiredPermission) {
    const allowed = hasFullAccess || permissions.includes(requiredPermission)
    if (!allowed) return <EmptyPermissionView />
  }

  if (requiredAny?.length) {
    const allowed = hasFullAccess || requiredAny.some((code) => permissions.includes(code))
    if (!allowed) return <EmptyPermissionView />
  }

  return children
}

export default ProtectedRoute

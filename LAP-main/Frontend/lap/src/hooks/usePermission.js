const usePermission = () => {
  const permissions = ['*']
  const role = 'Frontend Preview'
  const hasFullAccess = true

  const can    = () => true
  const canAny = () => true
  const canAll = () => true

  return { can, canAny, canAll, permissions, role, hasFullAccess }
}

export default usePermission

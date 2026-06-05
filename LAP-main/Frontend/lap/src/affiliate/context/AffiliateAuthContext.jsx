import React, { createContext, useCallback, useEffect, useState } from 'react'

export const AffiliateAuthContext = createContext()

const previewUser = {
  id: 'preview-affiliate',
  name: 'Frontend Preview',
  email: 'preview@example.com',
  referralCode: 'PREVIEW',
}

export const AffiliateAuthProvider = ({ children }) => {
  const [affiliateUser, setAffiliateUser] = useState(previewUser)
  const [affiliateLoading, setAffiliateLoading] = useState(true)

  useEffect(() => {
    localStorage.setItem('affiliate_ref_code', previewUser.referralCode)
    setAffiliateLoading(false)
  }, [])

  const updateProfile = useCallback(async (profileData) => {
    const updated = { ...affiliateUser, ...profileData }
    setAffiliateUser(updated)
    return updated
  }, [affiliateUser])

  const register = useCallback(async (registerData) => {
    const created = {
      id: Date.now(),
      ...registerData,
      referralCode: 'PREVIEW',
    }
    setAffiliateUser(created)
    localStorage.setItem('affiliate_onboarded', 'true')
    localStorage.setItem('affiliate_ref_code', created.referralCode)
    return created
  }, [])

  const logout = useCallback(() => {
    setAffiliateUser(previewUser)
  }, [])

  const refreshProfile = useCallback(async () => affiliateUser, [affiliateUser])

  return (
    <AffiliateAuthContext.Provider
      value={{
        user: affiliateUser,
        isAuthenticated: true,
        loading: affiliateLoading,
        register,
        logout,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AffiliateAuthContext.Provider>
  )
}

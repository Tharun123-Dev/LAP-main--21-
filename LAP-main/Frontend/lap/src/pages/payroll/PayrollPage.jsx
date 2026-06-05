import { useState, useEffect } from 'react'
import MyPayslips from './MyPayslips'
import MySalaryView from './MySalaryView'
import PayrollRuns from './PayrollRuns'
import SalaryConfig from './SalaryConfig'

function useBreakpoint() {
  const [bp, setBp] = useState(() => {
    if (typeof window === 'undefined') return 'desktop'
    return window.innerWidth <= 640 ? 'mobile' : window.innerWidth <= 1024 ? 'tablet' : 'desktop'
  })
  useEffect(() => {
    const handler = () =>
      setBp(window.innerWidth <= 640 ? 'mobile' : window.innerWidth <= 1024 ? 'tablet' : 'desktop')
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return bp
}

export default function PayrollPage() {
  const bp = useBreakpoint()
  const isMobile = bp === 'mobile'
  const [tab, setTab] = useState('payslips')

  const tabs = [
    { key: 'payslips', label: 'My Payslips', short: 'Payslips' },
    { key: 'salary', label: 'My Salary', short: 'Salary' },
    { key: 'runs', label: 'Payroll Runs', short: 'Runs' },
    { key: 'config', label: 'Salary Config', short: 'Config' },
  ]

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', width: '100%', boxSizing: 'border-box' }}>
      <div style={{
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        marginBottom: '20px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}>
        <div style={{
          display: 'flex',
          gap: '4px',
          background: '#f3f4f6',
          borderRadius: '10px',
          padding: '4px',
          width: isMobile ? 'max-content' : '100%',
          boxSizing: 'border-box',
        }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: isMobile ? '9px 14px' : '8px 14px',
                borderRadius: '7px',
                border: 'none',
                whiteSpace: 'nowrap',
                flex: isMobile ? '0 0 auto' : 1,
                background: tab === t.key ? '#fff' : 'transparent',
                color: tab === t.key ? '#1a1a2e' : '#888',
                fontWeight: tab === t.key ? 600 : 400,
                fontSize: isMobile ? '12px' : '13px',
                cursor: 'pointer',
                boxShadow: tab === t.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                transition: 'background 0.15s, color 0.15s',
                fontFamily: 'inherit',
              }}
            >
              {isMobile ? t.short : t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'payslips' && <MyPayslips />}
      {tab === 'salary' && <MySalaryView />}
      {tab === 'runs' && <PayrollRuns />}
      {tab === 'config' && <SalaryConfig />}
    </div>
  )
}

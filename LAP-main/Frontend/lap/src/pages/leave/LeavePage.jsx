import { useState } from 'react'
import BalanceDashboard from './BalanceDashboard'
import ApplyLeave from './ApplyLeave'
import MyRequests from './MyRequests'
import LeaveApprovals from './LeaveApprovals'
import LeaveTypeConfig from './LeaveTypeConfig'
import HolidayConfig from './HolidayConfig'

export default function LeavePage() {
  const [tab, setTab] = useState('balance')

  const tabs = [
    { key: 'balance', label: 'Balance' },
    { key: 'apply', label: 'Apply' },
    { key: 'my', label: 'My Requests' },
    { key: 'approvals', label: 'Approvals' },
    { key: 'config', label: 'Leave Types' },
    { key: 'holidays', label: 'Holidays' },
  ]

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '4px', background: '#f3f4f6', borderRadius: '10px', padding: '4px', width: 'fit-content', minWidth: '100%' }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: '8px 14px', borderRadius: '7px', border: 'none', whiteSpace: 'nowrap',
                background: tab === t.key ? '#fff' : 'transparent',
                color: tab === t.key ? '#1a1a2e' : '#888',
                fontWeight: tab === t.key ? 600 : 400,
                fontSize: '13px', cursor: 'pointer',
                boxShadow: tab === t.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                flex: 1,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'balance' && <BalanceDashboard />}
      {tab === 'apply' && <ApplyLeave onApplied={() => setTab('my')} />}
      {tab === 'my' && <MyRequests />}
      {tab === 'approvals' && <LeaveApprovals />}
      {tab === 'config' && <LeaveTypeConfig />}
      {tab === 'holidays' && <HolidayConfig />}
    </div>
  )
}

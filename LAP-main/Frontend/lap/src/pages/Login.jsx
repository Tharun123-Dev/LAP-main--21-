import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../store/authSlice'
import toast from 'react-hot-toast'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.value,
    }))
  }

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      toast.error('Fill all fields')
      return
    }

    setLoading(true)

    // Dummy Admin Login
    if (
      form.username === 'admin' &&
      form.password === 'admin123'
    ) {
      const dummyUser = {
        access: 'dummy-access-token',
        refresh: 'dummy-refresh-token',
        role: 'Super Admin',
        name: 'Admin',
        employee_type: 'Admin',
        permissions: ['*'],
      }

      dispatch(
  setCredentials({
    access: 'dummy-token',
    refresh: 'dummy-token',
    role: 'Super Admin',
    user: 'Admin',
    name: 'Admin',
    employee_type: 'Admin',
    permissions: ['*'],
  })
)

      localStorage.setItem('access', dummyUser.access)
      localStorage.setItem('refresh', dummyUser.refresh)
      localStorage.setItem('role', dummyUser.role)
      localStorage.setItem('name', dummyUser.name)

      toast.success('Welcome Admin!')
      navigate('/dashboard')
      return
    }

    toast.error('Invalid credentials')
    setLoading(false)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>LAP System</h1>
        <p style={styles.sub}>Leave · Attendance · Payroll</p>

        <label style={styles.lbl}>Username</label>
        <input
          value={form.username}
          onChange={set('username')}
          placeholder="Enter username"
          style={styles.inp}
        />

        <label style={{ ...styles.lbl, marginTop: 16 }}>
          Password
        </label>

        <input
          type="password"
          value={form.password}
          onChange={set('password')}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          placeholder="Enter password"
          style={styles.inp}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            ...styles.btn,
            background: loading ? '#999' : '#1a1a2e',
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f2f5',
    fontFamily: 'Inter, sans-serif',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 700,
    color: '#1a1a2e',
    margin: 0,
  },
  sub: {
    color: '#888',
    fontSize: '14px',
    marginTop: '6px',
    marginBottom: '28px',
  },
  lbl: {
    fontSize: '13px',
    color: '#555',
    display: 'block',
    marginBottom: '6px',
    fontWeight: 500,
  },
  inp: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  btn: {
    marginTop: '24px',
    width: '100%',
    padding: '12px',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
}
import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { LeadAppProvider, useLeadApp } from './context/LeadAppContext';

import LeadListPage from './pages/LeadListPage';
import LeadDetailsPage from './pages/LeadDetailsPage';
import AddEditLeadPage from './pages/AddEditLeadPage';
import FormBuilderPage from './pages/FormBuilderPage';
import AnalyticsPage from './pages/AnalyticsPage';
import FollowUpsPage from './pages/FollowUpsPage';
import LeadOptionsPage from './pages/LeadOptionsPage';
import Toast from './components/Common/Toast';

function LeadModuleInner() {
  const { toast } = useLeadApp();
  const hasAny = () => true;

  const navItems = [
    { path: '/dashboard/leads', label: 'All Leads', end: true },
    { path: '/dashboard/leads/student-form', label: 'Student Form' },
    { path: '/dashboard/leads/add', label: 'Add Lead' },
    { path: '/dashboard/leads/follow-ups', label: 'Follow Ups' },
    { path: '/dashboard/leads/analytics', label: 'Analytics' },
    { path: '/dashboard/leads/form-builder', label: 'Form Builder' },
    { path: '/dashboard/leads/options', label: 'Statuses' },
  ];

  return (
    <div className="min-h-full">
      <div className="mb-6 flex flex-wrap items-center gap-1 border-b border-slate-200 pb-3 dark:border-slate-700">
        <span className="mr-2 text-xs font-bold uppercase tracking-wider text-slate-400">Leads</span>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <Routes>
        <Route index element={hasAny('view_leads') && <LeadListPage />} />
        <Route path="student-form" element={hasAny('create_lead') && <AddEditLeadPage />} />
        <Route path="add" element={hasAny('create_lead') && <AddEditLeadPage />} />
        <Route path=":id" element={hasAny('view_leads') && <LeadDetailsPage />} />
        <Route path="edit/:id" element={hasAny('edit_lead') && <AddEditLeadPage />} />
        <Route path="follow-ups" element={hasAny('view_followups', 'create_followup') && <FollowUpsPage />} />
        <Route path="analytics" element={hasAny('view_lead_analytics') && <AnalyticsPage />} />
        <Route path="form-builder" element={hasAny('manage_lead_forms') && <FormBuilderPage />} />
        <Route path="options" element={hasAny('manage_lead_forms') && <LeadOptionsPage />} />
        <Route path="*" element={<Navigate to="/dashboard/leads" replace />} />
      </Routes>

      {toast && <Toast toast={toast} />}
    </div>
  );
}

export default function LeadShell() {
  return (
    <LeadAppProvider>
      <LeadModuleInner />
    </LeadAppProvider>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSpinner } from '@/components/admin/AdminSpinner';
import { Button } from '@/components/ui/Button';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { AddUserModal } from './AddUserModal';

type Role = { id: string; name: string };
type User = { id: string; name: string; email: string; roleId?: string };

const fieldClass =
  'rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:opacity-50';

export const UsersManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [savingUserId, setSavingUserId] = useState<string | null>(null);

  const load = async () => {
    setError('');
    try {
      const [usersRes, rolesRes] = await Promise.all([
        adminFetch('/api/admin/users'),
        adminFetch('/api/admin/roles'),
      ]);
      if (!usersRes.ok || !rolesRes.ok) {
        setError('Could not load users and roles.');
      }
      if (usersRes.ok) {
        const json = await usersRes.json();
        if (json && typeof json === 'object' && 'users' in json && Array.isArray(json.users)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setUsers(json.users);
        }
      }
      if (rolesRes.ok) {
        const json = await rolesRes.json();
        if (json && typeof json === 'object' && 'roles' in json && Array.isArray(json.roles)) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setRoles(json.roles);
        }
      }
    } catch {
      setError('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const assignRole = async (id: string, roleId: string) => {
    setSavingUserId(id);
    setError('');
    try {
      const res = await adminFetch(`/api/admin/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roleId }),
      });
      if (!res.ok) {
        setError('Could not update the role.');
        return;
      }
      await load();
    } catch {
      setError('Could not connect to the server.');
    } finally {
      setSavingUserId(null);
    }
  };

  const search = query.trim().toLowerCase();
  const filteredUsers = users.filter(
    (user) =>
      (!roleFilter || user.roleId === roleFilter) &&
      (!search || `${user.name} ${user.email}`.toLowerCase().includes(search)),
  );

  return (
    <div>
      <AdminPageHeader
        title="Users"

        action={
          <Button
            tone="brand"
            onClick={() => {
              setIsAddUserOpen(true);
            }}
          >
            <span aria-hidden="true" className="text-lg leading-none">
              +
            </span>
            Add user
          </Button>
        }
      />

      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-gray-900">
              {loading ? '—' : users.length}
            </span>
            <span className="text-sm text-gray-500">Total users</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-gray-900">
              {loading ? '—' : roles.length}
            </span>
            <span className="text-sm text-gray-500">Available roles</span>
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <section
          aria-labelledby="team-members-title"
          className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
        >
          <div className="space-y-5 border-b border-gray-100 p-5 sm:p-6">
            <div>
              <h2 id="team-members-title" className="text-base font-semibold text-gray-900">
                Team members
              </h2>
              <p className="mt-1 text-sm text-gray-500">Everyone with access to your workspace.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1 sm:max-w-md">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className="pointer-events-none absolute top-3 left-3.5 size-5 text-gray-400"
                >
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="m16 16 4.5 4.5" />
                </svg>
                <input
                  type="search"
                  aria-label="Search users by name or email"
                  placeholder="Search by name or email…"
                  className={`${fieldClass} w-full pl-11`}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />
              </div>
              <select
                aria-label="Filter users by role"
                className={`${fieldClass} sm:ml-auto sm:min-w-44`}
                value={roleFilter}
                onChange={(event) => {
                  setRoleFilter(event.target.value);
                }}
              >
                <option value="">All roles</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <AdminSpinner label="Loading team members…" fullHeight />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-100 bg-gray-50/80 text-xs font-medium tracking-wide text-gray-500 uppercase">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 sm:px-6">
                      Team member
                    </th>
                    <th scope="col" className="px-5 py-3.5 sm:px-6">
                      Access role
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} aria-label={user.name} className="transition-colors hover:bg-gray-50/70">
                      <td aria-label={`${user.name}, ${user.email}`} className="px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ps-red-50 text-sm font-semibold text-ps-red-600"
                          >
                            {user.name
                              .trim()
                              .split(/\s+/u)
                              .slice(0, 2)
                              .map((part) => part.charAt(0))
                              .join('')
                              .toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="mt-0.5 text-sm break-all text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="w-56 px-5 py-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <select
                            aria-label={`Role for ${user.email}`}
                            className={`${fieldClass} w-full min-w-32`}
                            disabled={savingUserId !== null}
                            value={user.roleId ?? ''}
                            onChange={(event) => {
                              void assignRole(user.id, event.target.value);
                            }}
                          >
                            <option value="" disabled>
                              Select role
                            </option>
                            {roles.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                          {savingUserId === user.id && <AdminSpinner size="sm" />}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={2} className="px-6 py-16 text-center">
                        <p className="font-semibold text-gray-900">
                          {search || roleFilter ? 'No matching users' : 'Your team starts here'}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                          {search || roleFilter
                            ? 'Adjust your search or role filter to find a team member.'
                            : 'Add your first user and choose their access role.'}
                        </p>
                        {(query || roleFilter) && (
                          <button
                            type="button"
                            className="mt-4 text-sm font-medium text-ps-red-600 hover:underline"
                            onClick={() => {
                              setQuery('');
                              setRoleFilter('');
                            }}
                          >
                            Clear filters
                          </button>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          <output className="block border-t border-gray-100 px-5 py-4 text-xs text-gray-500 sm:px-6">
            {loading
              ? 'Loading users…'
              : `Showing ${filteredUsers.length} of ${users.length} users`}
          </output>
        </section>
      </div>

      {isAddUserOpen && (
        <AddUserModal
          roles={roles}
          onClose={() => {
            setIsAddUserOpen(false);
          }}
          onCreated={load}
        />
      )}
    </div>
  );
};

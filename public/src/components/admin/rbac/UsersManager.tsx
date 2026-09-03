'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/libs/auth/AdminFetch';

type Role = { id: string; name: string };
type User = { id: string; name: string; email: string; roleId?: string };

const fieldClass = 'rounded-md border border-gray-300 px-3 py-2 text-sm';

export const UsersManager = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [form, setForm] = useState({ name: '', email: '', password: '', roleId: '' });
  const [error, setError] = useState('');

  const load = async () => {
    const [usersRes, rolesRes] = await Promise.all([
      adminFetch('/api/admin/users'),
      adminFetch('/api/admin/roles'),
    ]);
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
  };

  useEffect(() => {
    void load();
  }, []);

  const createUser = async () => {
    setError('');
    const res = await adminFetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ name: '', email: '', password: '', roleId: '' });
      await load();
    } else {
      setError('Could not create user (check email is unique and password ≥ 8 chars)');
    }
  };

  const assignRole = async (id: string, roleId: string) => {
    await adminFetch(`/api/admin/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roleId }),
    });
    await load();
  };

  const roleName = (roleId?: string) => roles.find((r) => r.id === roleId)?.name ?? '—';

  return (
    <div className="mt-6 space-y-6">
      <div className="grid gap-2 rounded-lg border border-gray-200 bg-white p-4 sm:grid-cols-5">
        <input
          aria-label="Name"
          className={fieldClass}
          placeholder="Name"
          value={form.name}
          onChange={(event) => {
            setForm({ ...form, name: event.target.value });
          }}
        />
        <input
          aria-label="Email"
          className={fieldClass}
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(event) => {
            setForm({ ...form, email: event.target.value });
          }}
        />
        <input
          aria-label="Password"
          className={fieldClass}
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(event) => {
            setForm({ ...form, password: event.target.value });
          }}
        />
        <select
          aria-label="Role for new user"
          className={fieldClass}
          value={form.roleId}
          onChange={(event) => {
            setForm({ ...form, roleId: event.target.value });
          }}
        >
          <option value="">Select role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
          disabled={!(form.name && form.email && form.password.length >= 8 && form.roleId)}
          onClick={createUser}
        >
          Add user
        </button>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-100">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2 text-gray-500">{user.email}</td>
                <td className="px-4 py-2">
                  <select
                    aria-label={`Role for ${user.email}`}
                    className={fieldClass}
                    value={user.roleId ?? ''}
                    onChange={(event) => {
                      void assignRole(user.id, event.target.value);
                    }}
                  >
                    <option value="">{roleName(user.roleId)}</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

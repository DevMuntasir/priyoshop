'use client';

import { useEffect, useState } from 'react';
import { adminFetch } from '@/libs/auth/AdminFetch';
import { PERMISSION_GROUPS, WILDCARD_PERMISSION } from '@/libs/auth/Permissions';

type Role = {
  id: string;
  name: string;
  permissions: string[];
  isSystem: boolean;
};

const togglePermission = (permissions: string[], key: string): string[] =>
  permissions.includes(key) ? permissions.filter((p) => p !== key) : [...permissions, key];

export const RolesManager = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');

  const load = async () => {
    const res = await adminFetch('/api/admin/roles');
    if (res.ok) {
      const json = await res.json();
      if (json && typeof json === 'object' && 'roles' in json && Array.isArray(json.roles)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setRoles(json.roles);
      }
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const createRole = async () => {
    setError('');
    const res = await adminFetch('/api/admin/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, permissions: [] }),
    });
    if (res.ok) {
      setNewName('');
      await load();
    } else {
      setError('Could not create role');
    }
  };

  const saveRole = async (role: Role) => {
    setError('');
    const res = await adminFetch(`/api/admin/roles/${role.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: role.name, permissions: role.permissions }),
    });
    if (!res.ok) {
      setError('Could not save role');
    }
    await load();
  };

  const removeRole = async (id: string) => {
    await adminFetch(`/api/admin/roles/${id}`, { method: 'DELETE' });
    await load();
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="flex gap-2">
        <input
          aria-label="New role name"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          placeholder="New role name"
          value={newName}
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <button
          type="button"
          className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
          disabled={newName.trim().length < 2}
          onClick={createRole}
        >
          Add role
        </button>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {roles.map((role) => {
        const isAdmin = role.permissions.includes(WILDCARD_PERMISSION);
        return (
          <div key={role.id} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-900">
                {role.name}
                {role.isSystem ? (
                  <span className="ml-2 text-xs text-gray-400 uppercase">system</span>
                ) : null}
              </div>
              {role.isSystem ? null : (
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:text-gray-900"
                    onClick={() => {
                      void saveRole(role);
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-700"
                    onClick={() => {
                      void removeRole(role.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {isAdmin ? (
              <p className="mt-3 text-sm text-gray-500">Full access to everything.</p>
            ) : (
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {PERMISSION_GROUPS.map((group) => (
                  <fieldset key={group.label}>
                    <legend className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                      {group.label}
                    </legend>
                    {group.permissions.map((permission) => (
                      <label key={permission} className="mt-1 flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          aria-label={permission}
                          checked={role.permissions.includes(permission)}
                          onChange={() => {
                            setRoles((current) =>
                              current.map((r) =>
                                r.id === role.id
                                  ? {
                                      ...r,
                                      permissions: togglePermission(r.permissions, permission),
                                    }
                                  : r,
                              ),
                            );
                          }}
                        />
                        {permission}
                      </label>
                    ))}
                  </fieldset>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

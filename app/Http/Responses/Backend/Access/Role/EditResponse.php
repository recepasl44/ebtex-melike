<?php

namespace App\Http\Responses\Backend\Access\Role;

use App\Models\Access\Permission\Permission;
use App\Models\Access\Role\Role;
use Glumbo\Generator\Module;
use Illuminate\Contracts\Support\Responsable;

class EditResponse implements Responsable
{
    /**
     * @var \App\Models\Access\Role\Role
     */
    protected $role;

    /**
     * @var \App\Repositories\Backend\Access\Permission\PermissionRepository
     */
    protected $permissions;

    /**
     * @param \App\Models\Access\Role\Role                                     $role
     * @param \App\Repositories\Backend\Access\Permission\PermissionRepository $permissions
     */
    public function __construct($role, $permissions)
    {
        $this->role = $role;
        $this->permissions = $permissions;
    }

    /**
     * toReponse.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $roles = Role::where('platform_id', 1)->get();
        $modules = Module::where('platform_id', 1)->get();
        $permissions = Permission::where('platform_id', 1)->pluck('id', 'name');

        return view('backend.access.roles.edit', compact('roles', 'modules'))
            ->withRole($this->role)
            ->withRolePermissions($this->role->permissions->pluck('id')->all())
            ->withPermissions($permissions);
    }
}

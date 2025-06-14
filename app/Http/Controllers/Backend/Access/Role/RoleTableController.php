<?php

namespace App\Http\Controllers\Backend\Access\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backend\Access\Role\ManageRoleRequest;
use App\Repositories\Backend\Access\Role\RoleRepository;
use Yajra\DataTables\Facades\DataTables;

/**
 * Class RoleTableController.
 */
class RoleTableController extends Controller
{
    /**
     * @var RoleRepository
     */
    protected $roles;

    /**
     * @param RoleRepository $roles
     */
    public function __construct(RoleRepository $roles)
    {
        $this->roles = $roles;
    }

    /**
     * @param ManageRoleRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageRoleRequest $request)
    {
        return Datatables::of($this->roles->getForDataTable())
            ->escapeColumns(['name', 'sort'])
            ->addColumn('permissions', function ($role) {
                if ($role->all) {
                    return '<span class="badge bg-outline-success">'._tr('labels.general.all').'</span>';
                }
                $names = explode('<br/>', $role->permission_name);
                foreach ($names as $key => $name){
                    $names[$key] = _tr($name);
                }
                $names = implode('<br/>', $names);

                return $names;
            })
            ->addColumn('users', function ($role) {
                return $role->userCount;
            })
            ->addColumn('actions', function ($role) {
                return $role->action_buttons;
            })
            ->make(true);
    }
}

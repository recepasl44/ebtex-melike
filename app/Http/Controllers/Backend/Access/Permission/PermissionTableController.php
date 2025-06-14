<?php

namespace App\Http\Controllers\Backend\Access\Permission;

use App\Http\Controllers\Controller;
use App\Http\Requests\Backend\Access\Permission\ManagePermissionRequest;
use App\Repositories\Backend\Access\Permission\PermissionRepository;
use Illuminate\Support\Str;
use Yajra\DataTables\Facades\DataTables;

/**
 * Class PermissionTableController.
 */
class PermissionTableController extends Controller
{
    /**
     * @var PermissionRepository
     */
    protected $permissions;

    /**
     * @param PermissionRepository $permissions
     */
    public function __construct(PermissionRepository $permissions)
    {
        $this->permissions = $permissions;
    }

    /**
     * @param ManagePermissionRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManagePermissionRequest $request)
    {
        return Datatables::of($this->permissions->getForDataTable())
            ->escapeColumns(['name', 'sort'])
            ->addColumn('actions', function ($permission) {
                return $permission->action_buttons;
            })
            ->addColumn('name', function ($permission) {
                if ($permission->all) {
                    return '<span class="badge bg-outline-success">'._tr('labels.general.all').'</span>';
                }
                return Str::slug(_tr($permission->name));
            })
            ->addColumn('display_name', function ($permission) {
                if ($permission->all) {
                    return '<span class="badge bg-outline-success">'._tr('labels.general.all').'</span>';
                }
                return _tr($permission->display_name);
            })
            ->addColumn('actions', function ($permission) {
                return $permission->action_buttons;
            })
            ->make(true);
    }
}

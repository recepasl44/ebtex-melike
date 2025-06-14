<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Access\Permission\Permission;
use App\Models\Access\Role\Role;
use App\Models\Access\User\User;
use App\Models\Settings\Setting;
use App\Supports\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Class DashboardController.
 */
class DashboardController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
        $settingData = Setting::first();
        $google_analytics = $settingData->google_analytics;

        return view('backend.dashboard', compact('google_analytics'));
    }

    /**
     * Used to display form for edit profile.
     *
     * @return view
     */
    public function editProfile(Request $request)
    {
        return view('backend.access.users.profile-edit')
            ->withLoggedInUser(access()->user());
    }

    /**
     * Used to update profile.
     *
     * @return view
     */
    public function updateProfile(Request $request)
    {
        $input = $request->all();
        $userId = access()->user()->id;
        $user = User::find($userId);
        $user->first_name = $input['first_name'];
        $user->last_name = $input['last_name'];
        $user->updated_by = access()->user()->id;

        if ($user->save()) {
            return redirect()->route('admin.profile.edit')
                ->withFlashSuccess(_tr('labels.backend.profile_updated'));
        }
    }

    /**
     * This function is used to get permissions details by role.
     *
     * @param Request $request
     */
    public function getPermissionByRole(Request $request)
    {
        if ($request->ajax()) {
            $role_id = $request->get('role_id');
            $rsRolePermissions = Role::where('id', $role_id)->first();
            $rolePermissions = $rsRolePermissions->permissions->pluck('display_name', 'id')->all();
            $permissions = Permission::pluck('display_name', 'id')->all();
            ksort($rolePermissions);
            ksort($permissions);
            $results['permissions'] = $permissions;
            $results['rolePermissions'] = $rolePermissions;
            $results['allPermissions'] = $rsRolePermissions->all;
            echo json_encode($results);
            die;
        }
    }

    public function reports(Request $request){

        $ws = DB::table('tasks')->select('workshops.name',DB::raw('count(*) as count'))
            ->leftJoin('workshops', 'tasks.workshop_id', '=', 'workshops.id')
            ->whereNotNull('workshops.id')
            ->groupBy('workshop_id')
            ->orderBy('workshop_id', 'asc')
            ->get();


        $ts = DB::select('SELECT workshops.name, COUNT(*) as c FROM (SELECT * FROM task_statuses WHERE task_statuses.status=4 GROUP BY task_statuses.task_id) as ts INNER JOIN tasks on ts.task_id = tasks.id INNER JOIN workshops on tasks.workshop_id = workshops.id GROUP BY workshop_id');
        $ts = collect($ts)->mapWithKeys(function ($item) {
            return [$item->name => $item->c];
        });


//        dd($ws, $ts);

        return view('backend.statistics.reports', compact('ws'));
    }

    public function userReports(User $user, Request $request){

        $statuses = [
            0 => _tr('pending'),
            1 => _tr('user_appointed'),
            2 => _tr('started_task'),
            3 => _tr('waiting_for_order'),
            4 => _tr('finished_tasks'),
            5 => _tr('cancel'),
            6 => _tr('additional_work_required'),
        ];

        $taskStatuses = DB::table('task_statuses')
            ->leftJoin('task_users','task_statuses.task_id', '=', 'task_users.task_id')
            ->select("status", DB::raw('count(*) as count'))
            ->where('task_users.user_id', '=', $user->id)
//            ->where('created_at', '>=', $startDate)
            ->groupBy('status')
            ->limit(100)
            ->get();

        $type = 'user';

        $colors = ['red', 'blue', 'green', 'yellow'];



        return view('backend.statistics.users.reports', compact('user', 'taskStatuses', 'statuses', 'colors', 'type'));
    }

    public function workshopReports(Workshop $workshop, Request $request){

        $statuses = [
            0 => _tr('pending'),
            1 => _tr('user_appointed'),
            2 => _tr('started_task'),
            3 => _tr('waiting_for_order'),
            4 => _tr('finished_tasks'),
            5 => _tr('cancel'),
            6 => _tr('additional_work_required'),
        ];

        $taskStatuses = DB::table('task_statuses')
            ->leftJoin('tasks','task_statuses.task_id', '=', 'tasks.id')
            ->select("status", DB::raw('count(*) as count'))
            ->where('tasks.workshop_id', '=', $workshop->id)
            ->groupBy('status')
            ->limit(10)
            ->get();

        $colors = ['red', 'blue', 'green', 'yellow'];

        $type = 'workshop';


        return view('backend.statistics.users.reports', compact('workshop', 'taskStatuses', 'statuses', 'colors', 'type'));
    }

    public function vehicleReports(Vehicle $vehicle, Request $request){

        $statuses = [
            0 => _tr('pending'),
            1 => _tr('user_appointed'),
            2 => _tr('started_task'),
            3 => _tr('waiting_for_order'),
            4 => _tr('finished_tasks'),
            5 => _tr('cancel'),
            6 => _tr('additional_work_required'),
        ];

        $taskStatuses = DB::table('task_statuses')
            ->leftJoin('tasks','task_statuses.task_id', '=', 'tasks.id')
            ->select("status", DB::raw('count(*) as count'))
            ->where('tasks.vehicle_id', '=', $vehicle->id)
            ->groupBy('status')
            ->limit(10)
            ->get();

        $colors = ['red', 'blue', 'green', 'yellow'];

        $type = 'vehicle';


        return view('backend.statistics.users.reports', compact('vehicle', 'taskStatuses', 'statuses', 'colors', 'type'));
    }
}

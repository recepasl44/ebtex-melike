<?php

namespace App\Http\Controllers\Backend\NotificationUsers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\NotificationUsers\NotificationUserRepository;
use App\Http\Requests\Backend\NotificationUsers\ManageNotificationUserRequest;

/**
 * Class NotificationUsersTableController.
 */
class NotificationUsersTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var NotificationUserRepository
     */
    protected $notificationuser;

    /**
     * contructor to initialize repository object
     * @param NotificationUserRepository $notificationuser;
     */
    public function __construct(NotificationUserRepository $notificationuser)
    {
        $this->notificationuser = $notificationuser;
    }

    /**
     * This method return the data of the model
     * @param ManageNotificationUserRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageNotificationUserRequest $request)
    {
        return Datatables::of($this->notificationuser->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($notificationuser) {
                return Carbon::parse($notificationuser->created_at)->toDateString();
            })
            ->addColumn('actions', function ($notificationuser) {
                return $notificationuser->action_buttons;
            })
            ->make(true);
    }
}

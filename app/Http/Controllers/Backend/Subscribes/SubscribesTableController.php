<?php

namespace App\Http\Controllers\Backend\Subscribes;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Subscribes\SubscribeRepository;
use App\Http\Requests\Backend\Subscribes\ManageSubscribeRequest;

/**
 * Class SubscribesTableController.
 */
class SubscribesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SubscribeRepository
     */
    protected $subscribe;

    /**
     * contructor to initialize repository object
     * @param SubscribeRepository $subscribe;
     */
    public function __construct(SubscribeRepository $subscribe)
    {
        $this->subscribe = $subscribe;
    }

    /**
     * This method return the data of the model
     * @param ManageSubscribeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSubscribeRequest $request)
    {
        return Datatables::of($this->subscribe->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($subscribe) {
                return Carbon::parseToDate($subscribe->created_at);
            })
            ->addColumn('actions', function ($subscribe) {
                return $subscribe->action_buttons;
            })
            ->make(true);
    }
}

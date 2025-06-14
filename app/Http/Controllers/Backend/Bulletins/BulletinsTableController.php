<?php

namespace App\Http\Controllers\Backend\Bulletins;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Bulletins\BulletinRepository;
use App\Http\Requests\Backend\Bulletins\ManageBulletinRequest;

/**
 * Class BulletinsTableController.
 */
class BulletinsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var BulletinRepository
     */
    protected $bulletin;

    /**
     * contructor to initialize repository object
     * @param BulletinRepository $bulletin;
     */
    public function __construct(BulletinRepository $bulletin)
    {
        $this->bulletin = $bulletin;
    }

    /**
     * This method return the data of the model
     * @param ManageBulletinRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageBulletinRequest $request)
    {
        return Datatables::of($this->bulletin->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($bulletin) {
                return Carbon::parse($bulletin->created_at)->toDateString();
            })
            ->addColumn('actions', function ($bulletin) {
                return $bulletin->action_buttons;
            })
            ->make(true);
    }
}

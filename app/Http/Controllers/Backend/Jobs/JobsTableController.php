<?php

namespace App\Http\Controllers\Backend\Jobs;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Jobs\JobRepository;
use App\Http\Requests\Backend\Jobs\ManageJobRequest;

/**
 * Class JobsTableController.
 */
class JobsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var JobRepository
     */
    protected $job;

    /**
     * contructor to initialize repository object
     * @param JobRepository $job;
     */
    public function __construct(JobRepository $job)
    {
        $this->job = $job;
    }

    /**
     * This method return the data of the model
     * @param ManageJobRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageJobRequest $request)
    {
        return Datatables::of($this->job->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($job) {
                return Carbon::parse($job->created_at)->toDateString();
            })
            ->addColumn('actions', function ($job) {
                return $job->action_buttons;
            })
            ->make(true);
    }
}

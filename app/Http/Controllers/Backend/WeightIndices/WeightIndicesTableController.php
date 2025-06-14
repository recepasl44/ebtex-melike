<?php

namespace App\Http\Controllers\Backend\WeightIndices;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\WeightIndices\WeightIndexRepository;
use App\Http\Requests\Backend\WeightIndices\ManageWeightIndexRequest;

/**
 * Class WeightIndicesTableController.
 */
class WeightIndicesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var WeightIndexRepository
     */
    protected $weightindex;

    /**
     * contructor to initialize repository object
     * @param WeightIndexRepository $weightindex;
     */
    public function __construct(WeightIndexRepository $weightindex)
    {
        $this->weightindex = $weightindex;
    }

    /**
     * This method return the data of the model
     * @param ManageWeightIndexRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageWeightIndexRequest $request)
    {
        return Datatables::of($this->weightindex->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('student', function ($weightindex) {
                return $weightindex?->student->first_name.' '.$weightindex?->student->last_name;
            })
            ->addColumn('created_at', function ($weightindex) {
                return Carbon::parse($weightindex->created_at)->toDateString();
            })
            ->addColumn('actions', function ($weightindex) {
                return $weightindex->action_buttons;
            })
            ->make(true);
    }
}

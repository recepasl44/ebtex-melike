<?php

namespace App\Http\Controllers\Backend\Models;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Models\ModelRepository;
use App\Http\Requests\Backend\Models\ManageModelRequest;

/**
 * Class ModelsTableController.
 */
class ModelsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ModelRepository
     */
    protected $model;

    /**
     * contructor to initialize repository object
     * @param ModelRepository $model;
     */
    public function __construct(ModelRepository $model)
    {
        $this->model = $model;
    }

    /**
     * This method return the data of the model
     * @param ManageModelRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageModelRequest $request)
    {
        return Datatables::of($this->model->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($model) {
                return Carbon::parse($model->created_at)->toDateString();
            })
            ->addColumn('actions', function ($model) {
                return $model->action_buttons;
            })
            ->make(true);
    }
}

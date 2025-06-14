<?php

namespace App\Http\Controllers\Backend\SocialTypes;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\SocialTypes\SocialTypeRepository;
use App\Http\Requests\Backend\SocialTypes\ManageSocialTypeRequest;

/**
 * Class SocialTypesTableController.
 */
class SocialTypesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var SocialTypeRepository
     */
    protected $socialtype;

    /**
     * contructor to initialize repository object
     * @param SocialTypeRepository $socialtype;
     */
    public function __construct(SocialTypeRepository $socialtype)
    {
        $this->socialtype = $socialtype;
    }

    /**
     * This method return the data of the model
     * @param ManageSocialTypeRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageSocialTypeRequest $request)
    {
        return Datatables::of($this->socialtype->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($socialtype) {
                return Carbon::parse($socialtype->created_at)->toDateString();
            })
            ->addColumn('actions', function ($socialtype) {
                return $socialtype->action_buttons;
            })
            ->make(true);
    }
}

<?php

namespace App\Http\Controllers\Backend\Agreements;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Agreements\AgreementRepository;
use App\Http\Requests\Backend\Agreements\ManageAgreementRequest;

/**
 * Class AgreementsTableController.
 */
class AgreementsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AgreementRepository
     */
    protected $agreement;

    /**
     * contructor to initialize repository object
     * @param AgreementRepository $agreement;
     */
    public function __construct(AgreementRepository $agreement)
    {
        $this->agreement = $agreement;
    }

    /**
     * This method return the data of the model
     * @param ManageAgreementRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAgreementRequest $request)
    {
        return Datatables::of($this->agreement->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($agreement) {
                return Carbon::parse($agreement->created_at)->toDateString();
            })
            ->addColumn('actions', function ($agreement) {
                return $agreement->action_buttons;
            })
            ->make(true);
    }
}

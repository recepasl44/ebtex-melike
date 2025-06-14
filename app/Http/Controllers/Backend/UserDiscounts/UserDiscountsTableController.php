<?php

namespace App\Http\Controllers\Backend\UserDiscounts;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\UserDiscounts\UserDiscountRepository;
use App\Http\Requests\Backend\UserDiscounts\ManageUserDiscountRequest;

/**
 * Class UserDiscountsTableController.
 */
class UserDiscountsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var UserDiscountRepository
     */
    protected $userdiscount;

    /**
     * contructor to initialize repository object
     * @param UserDiscountRepository $userdiscount;
     */
    public function __construct(UserDiscountRepository $userdiscount)
    {
        $this->userdiscount = $userdiscount;
    }

    /**
     * This method return the data of the model
     * @param ManageUserDiscountRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageUserDiscountRequest $request)
    {
        return Datatables::of($this->userdiscount->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($userdiscount) {
                return Carbon::parse($userdiscount->created_at)->toDateString();
            })
            ->addColumn('actions', function ($userdiscount) {
                return $userdiscount->action_buttons;
            })
            ->make(true);
    }
}

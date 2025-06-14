<?php

namespace App\Http\Controllers\Backend\Discounts;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Discounts\DiscountRepository;
use App\Http\Requests\Backend\Discounts\ManageDiscountRequest;

/**
 * Class DiscountsTableController.
 */
class DiscountsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var DiscountRepository
     */
    protected $discount;

    /**
     * contructor to initialize repository object
     * @param DiscountRepository $discount;
     */
    public function __construct(DiscountRepository $discount)
    {
        $this->discount = $discount;
    }

    /**
     * This method return the data of the model
     * @param ManageDiscountRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageDiscountRequest $request)
    {
        return Datatables::of($this->discount->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('service', function ($discount) {
                return $discount?->service?->name;
            })
            ->addColumn('type', function ($discount) {
                return $discount?->price_type_status;
            })
            ->addColumn('discount_type', function ($discount) {
                return $discount?->discount_type_status;
            })
            ->addColumn('created_at', function ($discount) {
                return Carbon::parse($discount->created_at)->toDateString();
            })
            ->addColumn('actions', function ($discount) {
                return $discount->action_buttons;
            })
            ->make(true);
    }
}

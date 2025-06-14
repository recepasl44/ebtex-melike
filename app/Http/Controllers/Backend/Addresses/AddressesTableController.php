<?php

namespace App\Http\Controllers\Backend\Addresses;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Addresses\AddressRepository;
use App\Http\Requests\Backend\Addresses\ManageAddressRequest;

/**
 * Class AddressesTableController.
 */
class AddressesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var AddressRepository
     */
    protected $address;

    /**
     * contructor to initialize repository object
     * @param AddressRepository $address;
     */
    public function __construct(AddressRepository $address)
    {
        $this->address = $address;
    }

    /**
     * This method return the data of the model
     * @param ManageAddressRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageAddressRequest $request)
    {
        return Datatables::of($this->address->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($address) {
                return Carbon::parse($address->created_at)->toDateString();
            })
            ->addColumn('actions', function ($address) {
                return $address->action_buttons;
            })
            ->make(true);
    }
}

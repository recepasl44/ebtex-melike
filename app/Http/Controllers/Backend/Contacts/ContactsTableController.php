<?php

namespace App\Http\Controllers\Backend\Contacts;

use App\Supports\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Contacts\ContactRepository;
use App\Http\Requests\Backend\Contacts\ManageContactRequest;

/**
 * Class ContactsTableController.
 */
class ContactsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ContactRepository
     */
    protected $contact;

    /**
     * contructor to initialize repository object
     * @param ContactRepository $contact;
     */
    public function __construct(ContactRepository $contact)
    {
        $this->contact = $contact;
    }

    /**
     * This method return the data of the model
     * @param ManageContactRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageContactRequest $request)
    {
        return Datatables::of($this->contact->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($contact) {
                return Carbon::parseToDate($contact->created_at);
            })
            ->addColumn('actions', function ($contact) {
                return $contact->action_buttons;
            })
            ->make(true);
    }
}

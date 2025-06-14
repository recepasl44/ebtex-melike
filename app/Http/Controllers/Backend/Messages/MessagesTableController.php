<?php

namespace App\Http\Controllers\Backend\Messages;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Messages\MessageRepository;
use App\Http\Requests\Backend\Messages\ManageMessageRequest;

/**
 * Class MessagesTableController.
 */
class MessagesTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var MessageRepository
     */
    protected $message;

    /**
     * contructor to initialize repository object
     * @param MessageRepository $message;
     */
    public function __construct(MessageRepository $message)
    {
        $this->message = $message;
    }

    /**
     * This method return the data of the model
     * @param ManageMessageRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageMessageRequest $request)
    {
        return Datatables::of($this->message->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($message) {
                return Carbon::parse($message->created_at)->toDateString();
            })
            ->addColumn('actions', function ($message) {
                return $message->action_buttons;
            })
            ->make(true);
    }
}

<?php

namespace App\Http\Controllers\Backend\Conversations;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Conversations\ConversationRepository;
use App\Http\Requests\Backend\Conversations\ManageConversationRequest;

/**
 * Class ConversationsTableController.
 */
class ConversationsTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ConversationRepository
     */
    protected $conversation;

    /**
     * contructor to initialize repository object
     * @param ConversationRepository $conversation;
     */
    public function __construct(ConversationRepository $conversation)
    {
        $this->conversation = $conversation;
    }

    /**
     * This method return the data of the model
     * @param ManageConversationRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageConversationRequest $request)
    {
        return Datatables::of($this->conversation->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($conversation) {
                return Carbon::parse($conversation->created_at)->toDateString();
            })
            ->addColumn('actions', function ($conversation) {
                return $conversation->action_buttons;
            })
            ->make(true);
    }
}

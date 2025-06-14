<?php

namespace App\Http\Controllers\Backend\ConversationUsers;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\ConversationUsers\ConversationUserRepository;
use App\Http\Requests\Backend\ConversationUsers\ManageConversationUserRequest;

/**
 * Class ConversationUsersTableController.
 */
class ConversationUsersTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var ConversationUserRepository
     */
    protected $conversationuser;

    /**
     * contructor to initialize repository object
     * @param ConversationUserRepository $conversationuser;
     */
    public function __construct(ConversationUserRepository $conversationuser)
    {
        $this->conversationuser = $conversationuser;
    }

    /**
     * This method return the data of the model
     * @param ManageConversationUserRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageConversationUserRequest $request)
    {
        return Datatables::of($this->conversationuser->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($conversationuser) {
                return Carbon::parse($conversationuser->created_at)->toDateString();
            })
            ->addColumn('actions', function ($conversationuser) {
                return $conversationuser->action_buttons;
            })
            ->make(true);
    }
}

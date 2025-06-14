<?php

namespace App\Http\Controllers\Backend\Conversations;

use App\Models\Conversations\Conversation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Conversations\CreateResponse;
use App\Http\Responses\Backend\Conversations\EditResponse;
use App\Repositories\Backend\Conversations\ConversationRepository;
use App\Http\Requests\Backend\Conversations\ManageConversationRequest;
use App\Http\Requests\Backend\Conversations\CreateConversationRequest;
use App\Http\Requests\Backend\Conversations\StoreConversationRequest;
use App\Http\Requests\Backend\Conversations\EditConversationRequest;
use App\Http\Requests\Backend\Conversations\UpdateConversationRequest;
use App\Http\Requests\Backend\Conversations\DeleteConversationRequest;

/**
 * ConversationsController
 */
class ConversationsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ConversationRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ConversationRepository $repository;
     */
    public function __construct(ConversationRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Conversations\ManageConversationRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageConversationRequest $request)
    {
        return new ViewResponse('backend.conversations.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateConversationRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Conversations\CreateResponse
     */
    public function create(CreateConversationRequest $request)
    {
        return new CreateResponse('backend.conversations.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreConversationRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreConversationRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.conversations.index'), ['flash_success' => _tr('alerts.backend.conversations.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Conversations\Conversation  $conversation
     * @param  EditConversationRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Conversations\EditResponse
     */
    public function edit(Conversation $conversation, EditConversationRequest $request)
    {
        return new EditResponse($conversation);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateConversationRequestNamespace  $request
     * @param  App\Models\Conversations\Conversation  $conversation
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateConversationRequest $request, Conversation $conversation)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $conversation, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.conversations.index'), ['flash_success' => _tr('alerts.backend.conversations.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteConversationRequestNamespace  $request
     * @param  App\Models\Conversations\Conversation  $conversation
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Conversation $conversation, DeleteConversationRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($conversation);
        //returning with successfull message
        return new RedirectResponse(route('admin.conversations.index'), ['flash_success' => _tr('alerts.backend.conversations.deleted')]);
    }
    
}

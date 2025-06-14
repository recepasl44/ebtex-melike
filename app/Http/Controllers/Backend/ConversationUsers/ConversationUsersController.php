<?php

namespace App\Http\Controllers\Backend\ConversationUsers;

use App\Models\ConversationUsers\ConversationUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ConversationUsers\CreateResponse;
use App\Http\Responses\Backend\ConversationUsers\EditResponse;
use App\Repositories\Backend\ConversationUsers\ConversationUserRepository;
use App\Http\Requests\Backend\ConversationUsers\ManageConversationUserRequest;
use App\Http\Requests\Backend\ConversationUsers\CreateConversationUserRequest;
use App\Http\Requests\Backend\ConversationUsers\StoreConversationUserRequest;
use App\Http\Requests\Backend\ConversationUsers\EditConversationUserRequest;
use App\Http\Requests\Backend\ConversationUsers\UpdateConversationUserRequest;
use App\Http\Requests\Backend\ConversationUsers\DeleteConversationUserRequest;

/**
 * ConversationUsersController
 */
class ConversationUsersController extends Controller
{
    /**
     * variable to store the repository object
     * @var ConversationUserRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ConversationUserRepository $repository;
     */
    public function __construct(ConversationUserRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ConversationUsers\ManageConversationUserRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageConversationUserRequest $request)
    {
        return new ViewResponse('backend.conversationusers.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateConversationUserRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ConversationUsers\CreateResponse
     */
    public function create(CreateConversationUserRequest $request)
    {
        return new CreateResponse('backend.conversationusers.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreConversationUserRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreConversationUserRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.conversationusers.index'), ['flash_success' => _tr('alerts.backend.conversationusers.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ConversationUsers\ConversationUser  $conversationuser
     * @param  EditConversationUserRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ConversationUsers\EditResponse
     */
    public function edit(ConversationUser $conversationuser, EditConversationUserRequest $request)
    {
        return new EditResponse($conversationuser);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateConversationUserRequestNamespace  $request
     * @param  App\Models\ConversationUsers\ConversationUser  $conversationuser
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateConversationUserRequest $request, ConversationUser $conversationuser)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $conversationuser, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.conversationusers.index'), ['flash_success' => _tr('alerts.backend.conversationusers.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteConversationUserRequestNamespace  $request
     * @param  App\Models\ConversationUsers\ConversationUser  $conversationuser
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ConversationUser $conversationuser, DeleteConversationUserRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($conversationuser);
        //returning with successfull message
        return new RedirectResponse(route('admin.conversationusers.index'), ['flash_success' => _tr('alerts.backend.conversationusers.deleted')]);
    }
    
}

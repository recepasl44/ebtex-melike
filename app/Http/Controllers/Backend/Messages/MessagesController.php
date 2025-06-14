<?php

namespace App\Http\Controllers\Backend\Messages;

use App\Models\Messages\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Messages\CreateResponse;
use App\Http\Responses\Backend\Messages\EditResponse;
use App\Repositories\Backend\Messages\MessageRepository;
use App\Http\Requests\Backend\Messages\ManageMessageRequest;
use App\Http\Requests\Backend\Messages\CreateMessageRequest;
use App\Http\Requests\Backend\Messages\StoreMessageRequest;
use App\Http\Requests\Backend\Messages\EditMessageRequest;
use App\Http\Requests\Backend\Messages\UpdateMessageRequest;
use App\Http\Requests\Backend\Messages\DeleteMessageRequest;

/**
 * MessagesController
 */
class MessagesController extends Controller
{
    /**
     * variable to store the repository object
     * @var MessageRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param MessageRepository $repository;
     */
    public function __construct(MessageRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Messages\ManageMessageRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageMessageRequest $request)
    {
        return new ViewResponse('backend.messages.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateMessageRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Messages\CreateResponse
     */
    public function create(CreateMessageRequest $request)
    {
        return new CreateResponse('backend.messages.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreMessageRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreMessageRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.messages.index'), ['flash_success' => _tr('alerts.backend.messages.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Messages\Message  $message
     * @param  EditMessageRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Messages\EditResponse
     */
    public function edit(Message $message, EditMessageRequest $request)
    {
        return new EditResponse($message);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateMessageRequestNamespace  $request
     * @param  App\Models\Messages\Message  $message
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateMessageRequest $request, Message $message)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $message, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.messages.index'), ['flash_success' => _tr('alerts.backend.messages.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteMessageRequestNamespace  $request
     * @param  App\Models\Messages\Message  $message
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Message $message, DeleteMessageRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($message);
        //returning with successfull message
        return new RedirectResponse(route('admin.messages.index'), ['flash_success' => _tr('alerts.backend.messages.deleted')]);
    }
    
}

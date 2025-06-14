<?php

namespace App\Http\Controllers\Backend\NotificationUsers;

use App\Models\NotificationUsers\NotificationUser;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\NotificationUsers\CreateResponse;
use App\Http\Responses\Backend\NotificationUsers\EditResponse;
use App\Repositories\Backend\NotificationUsers\NotificationUserRepository;
use App\Http\Requests\Backend\NotificationUsers\ManageNotificationUserRequest;
use App\Http\Requests\Backend\NotificationUsers\CreateNotificationUserRequest;
use App\Http\Requests\Backend\NotificationUsers\StoreNotificationUserRequest;
use App\Http\Requests\Backend\NotificationUsers\EditNotificationUserRequest;
use App\Http\Requests\Backend\NotificationUsers\UpdateNotificationUserRequest;
use App\Http\Requests\Backend\NotificationUsers\DeleteNotificationUserRequest;

/**
 * NotificationUsersController
 */
class NotificationUsersController extends Controller
{
    /**
     * variable to store the repository object
     * @var NotificationUserRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param NotificationUserRepository $repository;
     */
    public function __construct(NotificationUserRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\NotificationUsers\ManageNotificationUserRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageNotificationUserRequest $request)
    {
        return new ViewResponse('backend.notificationusers.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateNotificationUserRequestNamespace  $request
     * @return \App\Http\Responses\Backend\NotificationUsers\CreateResponse
     */
    public function create(CreateNotificationUserRequest $request)
    {
        return new CreateResponse('backend.notificationusers.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreNotificationUserRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreNotificationUserRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.notificationusers.index'), ['flash_success' => _tr('alerts.backend.notificationusers.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\NotificationUsers\NotificationUser  $notificationuser
     * @param  EditNotificationUserRequestNamespace  $request
     * @return \App\Http\Responses\Backend\NotificationUsers\EditResponse
     */
    public function edit(NotificationUser $notificationuser, EditNotificationUserRequest $request)
    {
        return new EditResponse($notificationuser);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateNotificationUserRequestNamespace  $request
     * @param  App\Models\NotificationUsers\NotificationUser  $notificationuser
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateNotificationUserRequest $request, NotificationUser $notificationuser)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $notificationuser, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.notificationusers.index'), ['flash_success' => _tr('alerts.backend.notificationusers.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteNotificationUserRequestNamespace  $request
     * @param  App\Models\NotificationUsers\NotificationUser  $notificationuser
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(NotificationUser $notificationuser, DeleteNotificationUserRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($notificationuser);
        //returning with successfull message
        return new RedirectResponse(route('admin.notificationusers.index'), ['flash_success' => _tr('alerts.backend.notificationusers.deleted')]);
    }
    
}

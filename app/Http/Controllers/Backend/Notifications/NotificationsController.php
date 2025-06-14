<?php

namespace App\Http\Controllers\Backend\Notifications;

use App\Models\Notifications\Notification;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Notifications\CreateResponse;
use App\Http\Responses\Backend\Notifications\EditResponse;
use App\Repositories\Backend\Notifications\NotificationRepository;
use App\Http\Requests\Backend\Notifications\ManageNotificationRequest;
use App\Http\Requests\Backend\Notifications\CreateNotificationRequest;
use App\Http\Requests\Backend\Notifications\StoreNotificationRequest;
use App\Http\Requests\Backend\Notifications\EditNotificationRequest;
use App\Http\Requests\Backend\Notifications\UpdateNotificationRequest;
use App\Http\Requests\Backend\Notifications\DeleteNotificationRequest;

/**
 * NotificationsController
 */
class NotificationsController extends Controller
{
    /**
     * variable to store the repository object
     * @var NotificationRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param NotificationRepository $repository;
     */
    public function __construct(NotificationRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Notifications\ManageNotificationRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageNotificationRequest $request)
    {
        return new ViewResponse('backend.notifications.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateNotificationRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Notifications\CreateResponse
     */
    public function create(CreateNotificationRequest $request)
    {
        return new CreateResponse('backend.notifications.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreNotificationRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreNotificationRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.notifications.index'), ['flash_success' => _tr('alerts.backend.notifications.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Notifications\Notification  $notification
     * @param  EditNotificationRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Notifications\EditResponse
     */
    public function edit(Notification $notification, EditNotificationRequest $request)
    {
        return new EditResponse($notification);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateNotificationRequestNamespace  $request
     * @param  App\Models\Notifications\Notification  $notification
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateNotificationRequest $request, Notification $notification)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $notification, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.notifications.index'), ['flash_success' => _tr('alerts.backend.notifications.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteNotificationRequestNamespace  $request
     * @param  App\Models\Notifications\Notification  $notification
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Notification $notification, DeleteNotificationRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($notification);
        //returning with successfull message
        return new RedirectResponse(route('admin.notifications.index'), ['flash_success' => _tr('alerts.backend.notifications.deleted')]);
    }
    
}

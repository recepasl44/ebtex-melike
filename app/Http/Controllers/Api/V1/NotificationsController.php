<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\NotificationResource;
use App\Models\Notifications\Notification;
use App\Repositories\Backend\Notifications\NotificationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * NotificationsController
 */
class NotificationsController extends APIController
{
    /**
     * __construct.
     *
     * @var NotificationRepository
     * @param $repository
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
     * Return the $notification.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return NotificationResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Notification $notification
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Notification $notification)
    {
        return new NotificationResource($notification);
    }

    
     /**
      * Creates the Resource for notification.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateNotification($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new NotificationResource(Notification::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update notification.
         *
         * @param Notification    $notification
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Notification $notification)
    {
        $validation = $this->validateNotification($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($notification, $request->all());

        $notification = Notification::findOrfail($notification->id);

        return new NotificationResource($notification);
    }
    
    /**
     * Delete notification.
     *
     * @param Notification    $notification
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Notification $notification)
    {
        $this->repository->delete($notification);

        return $this->respond([
            'message' => _tr('alerts.backend.notification.deleted'),
        ]);
    }
    

    /**
     * validate notification.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateNotification(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'title' => 'required|max:191',
               'message' => 'required|max:191',
               'sender_id' => 'required',
               'send_time' => 'date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate notification.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

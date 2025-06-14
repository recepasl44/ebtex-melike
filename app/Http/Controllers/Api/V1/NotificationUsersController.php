<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\NotificationUserResource;
use App\Models\NotificationUsers\NotificationUser;
use App\Repositories\Backend\NotificationUsers\NotificationUserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * NotificationUsersController
 */
class NotificationUsersController extends APIController
{
    /**
     * __construct.
     *
     * @var NotificationUserRepository
     * @param $repository
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
     * Return the $notificationuser.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return NotificationUserResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param NotificationUser $notificationuser
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(NotificationUser $notificationuser)
    {
        return new NotificationUserResource($notificationuser);
    }

    
     /**
      * Creates the Resource for notificationuser.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateNotificationUser($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new NotificationUserResource(NotificationUser::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update notificationuser.
         *
         * @param NotificationUser    $notificationuser
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, NotificationUser $notificationuser)
    {
        $validation = $this->validateNotificationUser($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($notificationuser, $request->all());

        $notificationuser = NotificationUser::findOrfail($notificationuser->id);

        return new NotificationUserResource($notificationuser);
    }
    
    /**
     * Delete notificationuser.
     *
     * @param NotificationUser    $notificationuser
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(NotificationUser $notificationuser)
    {
        $this->repository->delete($notificationuser);

        return $this->respond([
            'message' => _tr('alerts.backend.notificationuser.deleted'),
        ]);
    }
    

    /**
     * validate notificationuser.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateNotificationUser(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'notification_id' => 'required',
               'user_id' => 'required',
               'read_at' => 'date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate notificationuser.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

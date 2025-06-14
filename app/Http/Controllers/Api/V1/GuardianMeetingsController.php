<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\GuardianMeetingResource;
use App\Models\GuardianMeetings\GuardianMeeting;
use App\Repositories\Backend\GuardianMeetings\GuardianMeetingRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * GuardianMeetingsController
 */
class GuardianMeetingsController extends APIController
{
    /**
     * __construct.
     *
     * @var GuardianMeetingRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GuardianMeetingRepository $repository;
     */
    public function __construct(GuardianMeetingRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $guardianmeeting.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return GuardianMeetingResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param GuardianMeeting $guardianmeeting
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(GuardianMeeting $guardianmeeting)
    {
        return new GuardianMeetingResource($guardianmeeting);
    }

    
     /**
      * Creates the Resource for guardianmeeting.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateGuardianMeeting($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new GuardianMeetingResource(GuardianMeeting::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update guardianmeeting.
         *
         * @param GuardianMeeting    $guardianmeeting
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, GuardianMeeting $guardianmeeting)
    {
        $validation = $this->validateGuardianMeeting($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($guardianmeeting, $request->all());

        $guardianmeeting = GuardianMeeting::findOrfail($guardianmeeting->id);

        return new GuardianMeetingResource($guardianmeeting);
    }
    
    /**
     * Delete guardianmeeting.
     *
     * @param GuardianMeeting    $guardianmeeting
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(GuardianMeeting $guardianmeeting)
    {
        $this->repository->delete($guardianmeeting);

        return $this->respond([
            'message' => _tr('alerts.backend.guardianmeeting.deleted'),
        ]);
    }
    

    /**
     * validate guardianmeeting.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateGuardianMeeting(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'student_id' => 'required',
               'subject' => 'max:191',
               'suggestions' => 'max:191',
               'guardian_requests' => 'max:191',
               'satisfaction_status' => 'max:191',
               'notes' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate guardianmeeting.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

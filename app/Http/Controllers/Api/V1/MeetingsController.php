<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\MeetingResource;
use App\Models\Meetings\Meeting;
use App\Repositories\Backend\Meetings\MeetingRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * MeetingsController
 */
class MeetingsController extends APIController
{
    /**
     * __construct.
     *
     * @var MeetingRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param MeetingRepository $repository;
     */
    public function __construct(MeetingRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $meeting.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return MeetingResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Meeting $meeting
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Meeting $meeting)
    {
        return new MeetingResource($meeting);
    }

    
     /**
      * Creates the Resource for meeting.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateMeeting($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new MeetingResource(Meeting::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update meeting.
         *
         * @param Meeting    $meeting
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Meeting $meeting)
    {
        $validation = $this->validateMeeting($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($meeting, $request->all());

        $meeting = Meeting::findOrfail($meeting->id);

        return new MeetingResource($meeting);
    }
    
    /**
     * Delete meeting.
     *
     * @param Meeting    $meeting
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Meeting $meeting)
    {
        $this->repository->delete($meeting);

        return $this->respond([
            'message' => _tr('alerts.backend.meeting.deleted'),
        ]);
    }
    

    /**
     * validate meeting.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateMeeting(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'season_id' => 'required',
               'branche_id' => 'required',
               'student_id' => 'required',
               'meeting_date' => 'date',
               'created_by' => 'required',
               'meeting_note' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate meeting.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

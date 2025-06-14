<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\GuidanceMeetingResource;
use App\Models\GuidanceMeetings\GuidanceMeeting;
use App\Repositories\Backend\GuidanceMeetings\GuidanceMeetingRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * GuidanceMeetingsController
 */
class GuidanceMeetingsController extends APIController
{
    /**
     * __construct.
     *
     * @var GuidanceMeetingRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GuidanceMeetingRepository $repository;
     */
    public function __construct(GuidanceMeetingRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $guidancemeeting.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return GuidanceMeetingResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param GuidanceMeeting $guidancemeeting
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(GuidanceMeeting $guidancemeeting)
    {
        return new GuidanceMeetingResource($guidancemeeting);
    }

    
     /**
      * Creates the Resource for guidancemeeting.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateGuidanceMeeting($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new GuidanceMeetingResource(GuidanceMeeting::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update guidancemeeting.
         *
         * @param GuidanceMeeting    $guidancemeeting
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, GuidanceMeeting $guidancemeeting)
    {
        $validation = $this->validateGuidanceMeeting($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($guidancemeeting, $request->all());

        $guidancemeeting = GuidanceMeeting::findOrfail($guidancemeeting->id);

        return new GuidanceMeetingResource($guidancemeeting);
    }
    
    /**
     * Delete guidancemeeting.
     *
     * @param GuidanceMeeting    $guidancemeeting
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(GuidanceMeeting $guidancemeeting)
    {
        $this->repository->delete($guidancemeeting);

        return $this->respond([
            'message' => _tr('alerts.backend.guidancemeeting.deleted'),
        ]);
    }
    

    /**
     * validate guidancemeeting.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateGuidanceMeeting(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'student_id' => 'required',
               'meeting_topic' => 'max:191',
               'guidance_name' => 'max:191',
               'meeting_notes' => 'max:191',
               'meeting_date' => 'date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate guidancemeeting.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

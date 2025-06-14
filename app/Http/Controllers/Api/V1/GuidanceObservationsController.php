<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\GuidanceObservationResource;
use App\Models\GuidanceObservations\GuidanceObservation;
use App\Repositories\Backend\GuidanceObservations\GuidanceObservationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * GuidanceObservationsController
 */
class GuidanceObservationsController extends APIController
{
    /**
     * __construct.
     *
     * @var GuidanceObservationRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GuidanceObservationRepository $repository;
     */
    public function __construct(GuidanceObservationRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $guidanceobservation.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return GuidanceObservationResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param GuidanceObservation $guidanceobservation
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(GuidanceObservation $guidanceobservation)
    {
        return new GuidanceObservationResource($guidanceobservation);
    }

    
     /**
      * Creates the Resource for guidanceobservation.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateGuidanceObservation($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new GuidanceObservationResource(GuidanceObservation::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update guidanceobservation.
         *
         * @param GuidanceObservation    $guidanceobservation
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, GuidanceObservation $guidanceobservation)
    {
        $validation = $this->validateGuidanceObservation($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($guidanceobservation, $request->all());

        $guidanceobservation = GuidanceObservation::findOrfail($guidanceobservation->id);

        return new GuidanceObservationResource($guidanceobservation);
    }
    
    /**
     * Delete guidanceobservation.
     *
     * @param GuidanceObservation    $guidanceobservation
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(GuidanceObservation $guidanceobservation)
    {
        $this->repository->delete($guidanceobservation);

        return $this->respond([
            'message' => _tr('alerts.backend.guidanceobservation.deleted'),
        ]);
    }
    

    /**
     * validate guidanceobservation.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateGuidanceObservation(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'student_id' => 'required',
               'title' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate guidanceobservation.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

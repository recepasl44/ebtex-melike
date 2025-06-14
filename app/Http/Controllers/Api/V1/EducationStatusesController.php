<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\EducationStatusResource;
use App\Models\EducationStatuses\EducationStatus;
use App\Repositories\Backend\EducationStatuses\EducationStatusRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * EducationStatusesController
 */
class EducationStatusesController extends APIController
{
    /**
     * __construct.
     *
     * @var EducationStatusRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EducationStatusRepository $repository;
     */
    public function __construct(EducationStatusRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return the $educationstatus.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return EducationStatusResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param EducationStatus $educationstatus
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(EducationStatus $educationstatus)
    {
        return new EducationStatusResource($educationstatus);
    }

    
     /**
      * Creates the Resource for educationstatus.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateEducationStatus($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new EducationStatusResource(EducationStatus::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update educationstatus.
         *
         * @param EducationStatus    $educationstatus
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, EducationStatus $educationstatus)
    {
        $validation = $this->validateEducationStatus($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($educationstatus, $request->all());

        $educationstatus = EducationStatus::findOrfail($educationstatus->id);

        return new EducationStatusResource($educationstatus);
    }
    
    /**
     * Delete educationstatus.
     *
     * @param EducationStatus    $educationstatus
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(EducationStatus $educationstatus)
    {
        $this->repository->delete($educationstatus);

        return $this->respond([
            'message' => _tr('alerts.backend.educationstatus.deleted'),
        ]);
    }
    

    /**
     * validate educationstatus.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateEducationStatus(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate educationstatus.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ScolarshipAssignResource;
use App\Models\ScolarshipAssigns\ScolarshipAssign;
use App\Repositories\Backend\ScolarshipAssigns\ScolarshipAssignRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ScolarshipAssignsController
 */
class ScolarshipAssignsController extends APIController
{
    /**
     * __construct.
     *
     * @var ScolarshipAssignRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ScolarshipAssignRepository $repository;
     */
    public function __construct(ScolarshipAssignRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $scolarshipassign.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ScolarshipAssignResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ScolarshipAssign $scolarshipassign
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ScolarshipAssign $scolarshipassign)
    {
        return new ScolarshipAssignResource($scolarshipassign);
    }

    
     /**
      * Creates the Resource for scolarshipassign.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateScolarshipAssign($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ScolarshipAssignResource(ScolarshipAssign::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update scolarshipassign.
         *
         * @param ScolarshipAssign    $scolarshipassign
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ScolarshipAssign $scolarshipassign)
    {
        $validation = $this->validateScolarshipAssign($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($scolarshipassign, $request->all());

        $scolarshipassign = ScolarshipAssign::findOrfail($scolarshipassign->id);

        return new ScolarshipAssignResource($scolarshipassign);
    }
    
    /**
     * Delete scolarshipassign.
     *
     * @param ScolarshipAssign    $scolarshipassign
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ScolarshipAssign $scolarshipassign)
    {
        $this->repository->delete($scolarshipassign);

        return $this->respond([
            'message' => _tr('alerts.backend.scolarshipassign.deleted'),
        ]);
    }
    

    /**
     * validate scolarshipassign.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateScolarshipAssign(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'scholarship_id' => 'required',
               'branche_id' => 'required',
               'classroom_id' => 'required',
               'session_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate scolarshipassign.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

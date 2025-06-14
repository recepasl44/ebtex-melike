<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\PointTypeResource;
use App\Models\PointTypes\PointType;
use App\Repositories\Backend\PointTypes\PointTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * PointTypesController
 */
class PointTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var PointTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PointTypeRepository $repository;
     */
    public function __construct(PointTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $pointtype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return PointTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param PointType $pointtype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(PointType $pointtype)
    {
        return new PointTypeResource($pointtype);
    }

    
     /**
      * Creates the Resource for pointtype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validatePointType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new PointTypeResource(PointType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update pointtype.
         *
         * @param PointType    $pointtype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, PointType $pointtype)
    {
        $validation = $this->validatePointType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($pointtype, $request->all());

        $pointtype = PointType::findOrfail($pointtype->id);

        return new PointTypeResource($pointtype);
    }
    
    /**
     * Delete pointtype.
     *
     * @param PointType    $pointtype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(PointType $pointtype)
    {
        $this->repository->delete($pointtype);

        return $this->respond([
            'message' => _tr('alerts.backend.pointtype.deleted'),
        ]);
    }
    

    /**
     * validate pointtype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validatePointType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'quiz_category_id' => 'required',
               ]);

        return $validation;
    }

    /**  
     * validate message for validate pointtype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

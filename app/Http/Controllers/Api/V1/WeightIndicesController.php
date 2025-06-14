<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\WeightIndexResource;
use App\Models\WeightIndices\WeightIndex;
use App\Repositories\Backend\WeightIndices\WeightIndexRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * WeightIndicesController
 */
class WeightIndicesController extends APIController
{
    /**
     * __construct.
     *
     * @var WeightIndexRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param WeightIndexRepository $repository;
     */
    public function __construct(WeightIndexRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $weightindex.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return WeightIndexResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param WeightIndex $weightindex
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(WeightIndex $weightindex)
    {
        return new WeightIndexResource($weightindex);
    }

    
     /**
      * Creates the Resource for weightindex.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateWeightIndex($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new WeightIndexResource(WeightIndex::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update weightindex.
         *
         * @param WeightIndex    $weightindex
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, WeightIndex $weightindex)
    {
        $validation = $this->validateWeightIndex($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($weightindex, $request->all());

        $weightindex = WeightIndex::findOrfail($weightindex->id);

        return new WeightIndexResource($weightindex);
    }
    
    /**
     * Delete weightindex.
     *
     * @param WeightIndex    $weightindex
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(WeightIndex $weightindex)
    {
        $this->repository->delete($weightindex);

        return $this->respond([
            'message' => _tr('alerts.backend.weightindex.deleted'),
        ]);
    }
    

    /**
     * validate weightindex.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateWeightIndex(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'student_id' => 'required',
               'height' => 'required|decimal:2',
               'weight' => 'required|decimal:2',
               'indice' => 'decimal:2',
               ]);

        return $validation;
    }

    /**
     * validate message for validate weightindex.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

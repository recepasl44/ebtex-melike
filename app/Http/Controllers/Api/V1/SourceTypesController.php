<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\SourceTypeResource;
use App\Models\SourceTypes\SourceType;
use App\Repositories\Backend\SourceTypes\SourceTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * SourceTypesController
 */
class SourceTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var SourceTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SourceTypeRepository $repository;
     */
    public function __construct(SourceTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $sourcetype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return SourceTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param SourceType $sourcetype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(SourceType $sourcetype)
    {
        return new SourceTypeResource($sourcetype);
    }

    
     /**
      * Creates the Resource for sourcetype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateSourceType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new SourceTypeResource(SourceType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update sourcetype.
         *
         * @param SourceType    $sourcetype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, SourceType $sourcetype)
    {
        $validation = $this->validateSourceType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($sourcetype, $request->all());

        $sourcetype = SourceType::findOrfail($sourcetype->id);

        return new SourceTypeResource($sourcetype);
    }
    
    /**
     * Delete sourcetype.
     *
     * @param SourceType    $sourcetype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(SourceType $sourcetype)
    {
        $this->repository->delete($sourcetype);

        return $this->respond([
            'message' => _tr('alerts.backend.sourcetype.deleted'),
        ]);
    }
    

    /**
     * validate sourcetype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateSourceType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate sourcetype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

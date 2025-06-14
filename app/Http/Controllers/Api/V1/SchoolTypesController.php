<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\SchoolTypeResource;
use App\Models\SchoolTypes\SchoolType;
use App\Repositories\Backend\SchoolTypes\SchoolTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * SchoolTypesController
 */
class SchoolTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var SchoolTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SchoolTypeRepository $repository;
     */
    public function __construct(SchoolTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $schooltype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return SchoolTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param SchoolType $schooltype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(SchoolType $schooltype)
    {
        return new SchoolTypeResource($schooltype);
    }

    
     /**
      * Creates the Resource for schooltype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateSchoolType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new SchoolTypeResource(SchoolType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update schooltype.
         *
         * @param SchoolType    $schooltype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, SchoolType $schooltype)
    {
        $validation = $this->validateSchoolType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($schooltype, $request->all());

        $schooltype = SchoolType::findOrfail($schooltype->id);

        return new SchoolTypeResource($schooltype);
    }
    
    /**
     * Delete schooltype.
     *
     * @param SchoolType    $schooltype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(SchoolType $schooltype)
    {
        $this->repository->delete($schooltype);

        return $this->respond([
            'message' => _tr('alerts.backend.schooltype.deleted'),
        ]);
    }
    

    /**
     * validate schooltype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateSchoolType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate schooltype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

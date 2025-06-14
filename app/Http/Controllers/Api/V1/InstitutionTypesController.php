<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\InstitutionTypeResource;
use App\Models\InstitutionTypes\InstitutionType;
use App\Repositories\Backend\InstitutionTypes\InstitutionTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * InstitutionTypesController
 */
class InstitutionTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var InstitutionTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param InstitutionTypeRepository $repository;
     */
    public function __construct(InstitutionTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $institutiontype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return InstitutionTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param InstitutionType $institutiontype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(InstitutionType $institutiontype)
    {
        return new InstitutionTypeResource($institutiontype);
    }

    
     /**
      * Creates the Resource for institutiontype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateInstitutionType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new InstitutionTypeResource(InstitutionType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update institutiontype.
         *
         * @param InstitutionType    $institutiontype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, InstitutionType $institutiontype)
    {
        $validation = $this->validateInstitutionType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($institutiontype, $request->all());

        $institutiontype = InstitutionType::findOrfail($institutiontype->id);

        return new InstitutionTypeResource($institutiontype);
    }
    
    /**
     * Delete institutiontype.
     *
     * @param InstitutionType    $institutiontype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(InstitutionType $institutiontype)
    {
        $this->repository->delete($institutiontype);

        return $this->respond([
            'message' => _tr('alerts.backend.institutiontype.deleted'),
        ]);
    }
    

    /**
     * validate institutiontype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateInstitutionType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate institutiontype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

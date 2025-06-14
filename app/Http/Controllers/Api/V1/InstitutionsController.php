<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\InstitutionResource;
use App\Models\Institutions\Institution;
use App\Repositories\Backend\Institutions\InstitutionRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * InstitutionsController
 */
class InstitutionsController extends APIController
{
    /**
     * __construct.
     *
     * @var InstitutionRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param InstitutionRepository $repository;
     */
    public function __construct(InstitutionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $institution.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return InstitutionResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Institution $institution
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Institution $institution)
    {
        return new InstitutionResource($institution);
    }

    
     /**
      * Creates the Resource for institution.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateInstitution($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new InstitutionResource(Institution::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update institution.
         *
         * @param Institution    $institution
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Institution $institution)
    {
        $validation = $this->validateInstitution($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($institution, $request->all());

        $institution = Institution::findOrfail($institution->id);

        return new InstitutionResource($institution);
    }
    
    /**
     * Delete institution.
     *
     * @param Institution    $institution
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Institution $institution)
    {
        $this->repository->delete($institution);

        return $this->respond([
            'message' => _tr('alerts.backend.institution.deleted'),
        ]);
    }
    

    /**
     * validate institution.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateInstitution(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate institution.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

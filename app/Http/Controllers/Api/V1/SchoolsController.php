<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\SchoolResource;
use App\Models\Schools\School;
use App\Repositories\Backend\Schools\SchoolRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * SchoolsController
 */
class SchoolsController extends APIController
{
    /**
     * __construct.
     *
     * @var SchoolRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SchoolRepository $repository;
     */
    public function __construct(SchoolRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $school.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return SchoolResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param School $school
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(School $school)
    {
        return new SchoolResource($school);
    }

    
     /**
      * Creates the Resource for school.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateSchool($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new SchoolResource(School::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update school.
         *
         * @param School    $school
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, School $school)
    {
        $validation = $this->validateSchool($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($school, $request->all());

        $school = School::findOrfail($school->id);

        return new SchoolResource($school);
    }
    
    /**
     * Delete school.
     *
     * @param School    $school
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(School $school)
    {
        $this->repository->delete($school);

        return $this->respond([
            'message' => _tr('alerts.backend.school.deleted'),
        ]);
    }
    

    /**
     * validate school.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateSchool(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'country_id' => 'required',
               'city_id' => 'required',
               'county_id' => 'required',
               'code' => 'max:191',
               'website' => 'max:191',
               'address' => 'max:191',
               'phone' => 'max:191',
               'email' => 'max:191',
               'fax' => 'max:191',
               'additional_information' => 'max:191',
               'type_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate school.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

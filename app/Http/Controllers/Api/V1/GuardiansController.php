<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\GuardianResource;
use App\Models\Guardians\Guardian;
use App\Repositories\Backend\Guardians\GuardianRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * GuardiansController
 */
class GuardiansController extends APIController
{
    /**
     * __construct.
     *
     * @var GuardianRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GuardianRepository $repository;
     */
    public function __construct(GuardianRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $guardian.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return GuardianResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Guardian $guardian
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Guardian $guardian)
    {
        return new GuardianResource($guardian);
    }

    
     /**
      * Creates the Resource for guardian.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateGuardian($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new GuardianResource(Guardian::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update guardian.
         *
         * @param Guardian    $guardian
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Guardian $guardian)
    {
        $validation = $this->validateGuardian($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($guardian, $request->all());

        $guardian = Guardian::findOrfail($guardian->id);

        return new GuardianResource($guardian);
    }
    
    /**
     * Delete guardian.
     *
     * @param Guardian    $guardian
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Guardian $guardian)
    {
        $this->repository->delete($guardian);

        return $this->respond([
            'message' => _tr('alerts.backend.guardian.deleted'),
        ]);
    }
    

    /**
     * validate guardian.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateGuardian(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'identification_no' => 'required',
               'full_name' => 'required|max:191',
               'phone' => 'required|max:191',
               'profession' => 'max:191',
               'home_phone' => 'max:191',
               'work_phone' => 'max:191',
               'address' => 'required|max:191',
               'work_address' => 'max:191',
               'birthday' => 'date',
               'workplace' => 'max:191',
               'email' => 'max:191',
               'wedding_anniversary' => 'date',
               'student_id' => 'required',
               'kinship_id' => 'required',
               'kinship' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate guardian.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

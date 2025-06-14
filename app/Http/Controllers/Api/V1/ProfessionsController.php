<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ProfessionResource;
use App\Models\Professions\Profession;
use App\Repositories\Backend\Professions\ProfessionRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ProfessionsController
 */
class ProfessionsController extends APIController
{
    /**
     * __construct.
     *
     * @var ProfessionRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ProfessionRepository $repository;
     */
    public function __construct(ProfessionRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return the $profession.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ProfessionResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Profession $profession
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Profession $profession)
    {
        return new ProfessionResource($profession);
    }

    
     /**
      * Creates the Resource for profession.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateProfession($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ProfessionResource(Profession::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update profession.
         *
         * @param Profession    $profession
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Profession $profession)
    {
        $validation = $this->validateProfession($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($profession, $request->all());

        $profession = Profession::findOrfail($profession->id);

        return new ProfessionResource($profession);
    }
    
    /**
     * Delete profession.
     *
     * @param Profession    $profession
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Profession $profession)
    {
        $this->repository->delete($profession);

        return $this->respond([
            'message' => _tr('alerts.backend.profession.deleted'),
        ]);
    }
    

    /**
     * validate profession.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateProfession(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate profession.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

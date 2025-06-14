<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ScholarshipResource;
use App\Models\Scholarships\Scholarship;
use App\Repositories\Backend\Scholarships\ScholarshipRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ScholarshipsController
 */
class ScholarshipsController extends APIController
{
    /**
     * __construct.
     *
     * @var ScholarshipRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ScholarshipRepository $repository;
     */
    public function __construct(ScholarshipRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $scholarship.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ScholarshipResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Scholarship $scholarship
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Scholarship $scholarship)
    {
        return new ScholarshipResource($scholarship);
    }

    
     /**
      * Creates the Resource for scholarship.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateScholarship($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ScholarshipResource(Scholarship::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update scholarship.
         *
         * @param Scholarship    $scholarship
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Scholarship $scholarship)
    {
        $validation = $this->validateScholarship($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($scholarship, $request->all());

        $scholarship = Scholarship::findOrfail($scholarship->id);

        return new ScholarshipResource($scholarship);
    }
    
    /**
     * Delete scholarship.
     *
     * @param Scholarship    $scholarship
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Scholarship $scholarship)
    {
        $this->repository->delete($scholarship);

        return $this->respond([
            'message' => _tr('alerts.backend.scholarship.deleted'),
        ]);
    }
    

    /**
     * validate scholarship.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateScholarship(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'short_name' => 'required|max:191',
               'name' => 'required|max:191',
               'branche_id' => 'required',
               'season_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate scholarship.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

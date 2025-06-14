<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\CountyResource;
use App\Models\Counties\County;
use App\Repositories\Backend\Counties\CountyRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * CountiesController
 */
class CountiesController extends APIController
{
    /**
     * __construct.
     *
     * @var CountyRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param CountyRepository $repository;
     */
    public function __construct(CountyRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $county.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return CountyResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param County $county
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(County $county)
    {
        return new CountyResource($county);
    }

    
     /**
      * Creates the Resource for county.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateCounty($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new CountyResource(County::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update county.
         *
         * @param County    $county
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, County $county)
    {
        $validation = $this->validateCounty($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($county, $request->all());

        $county = County::findOrfail($county->id);

        return new CountyResource($county);
    }
    
    /**
     * Delete county.
     *
     * @param County    $county
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(County $county)
    {
        $this->repository->delete($county);

        return $this->respond([
            'message' => _tr('alerts.backend.county.deleted'),
        ]);
    }
    

    /**
     * validate county.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateCounty(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'city_id' => 'required',
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate county.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

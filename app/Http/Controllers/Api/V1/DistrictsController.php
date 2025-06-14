<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\DistrictResource;
use App\Models\Districts\District;
use App\Repositories\Backend\Districts\DistrictRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * DistrictsController
 */
class DistrictsController extends APIController
{
    /**
     * __construct.
     *
     * @var DistrictRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param DistrictRepository $repository;
     */
    public function __construct(DistrictRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $district.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return DistrictResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param District $district
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(District $district)
    {
        return new DistrictResource($district);
    }

    
     /**
      * Creates the Resource for district.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateDistrict($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new DistrictResource(District::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update district.
         *
         * @param District    $district
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, District $district)
    {
        $validation = $this->validateDistrict($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($district, $request->all());

        $district = District::findOrfail($district->id);

        return new DistrictResource($district);
    }
    
    /**
     * Delete district.
     *
     * @param District    $district
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(District $district)
    {
        $this->repository->delete($district);

        return $this->respond([
            'message' => _tr('alerts.backend.district.deleted'),
        ]);
    }
    

    /**
     * validate district.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateDistrict(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'county_id' => 'required',
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate district.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

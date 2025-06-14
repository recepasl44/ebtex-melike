<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\CityResource;
use App\Models\Cities\City;
use App\Repositories\Backend\Cities\CityRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * CitiesController
 */
class CitiesController extends APIController
{
    /**
     * __construct.
     *
     * @var CityRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param CityRepository $repository;
     */
    public function __construct(CityRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $city.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return CityResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param City $city
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(City $city)
    {
        return new CityResource($city);
    }

    
     /**
      * Creates the Resource for city.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateCity($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new CityResource(City::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update city.
         *
         * @param City    $city
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, City $city)
    {
        $validation = $this->validateCity($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($city, $request->all());

        $city = City::findOrfail($city->id);

        return new CityResource($city);
    }
    
    /**
     * Delete city.
     *
     * @param City    $city
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(City $city)
    {
        $this->repository->delete($city);

        return $this->respond([
            'message' => _tr('alerts.backend.city.deleted'),
        ]);
    }
    

    /**
     * validate city.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateCity(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'city_id' => 'required',
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate city.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

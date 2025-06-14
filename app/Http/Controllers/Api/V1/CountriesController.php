<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\CountryResource;
use App\Models\Countries\Country;
use App\Repositories\Backend\Countries\CountryRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * CountriesController
 */
class CountriesController extends APIController
{
    /**
     * __construct.
     *
     * @var CountryRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param CountryRepository $repository;
     */
    public function __construct(CountryRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $country.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return CountryResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Country $country
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Country $country)
    {
        return new CountryResource($country);
    }

    
     /**
      * Creates the Resource for country.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateCountry($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new CountryResource(Country::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update country.
         *
         * @param Country    $country
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Country $country)
    {
        $validation = $this->validateCountry($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($country, $request->all());

        $country = Country::findOrfail($country->id);

        return new CountryResource($country);
    }
    
    /**
     * Delete country.
     *
     * @param Country    $country
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Country $country)
    {
        $this->repository->delete($country);

        return $this->respond([
            'message' => _tr('alerts.backend.country.deleted'),
        ]);
    }
    

    /**
     * validate country.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateCountry(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'city_id' => 'required',
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate country.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

<?php

namespace App\Http\Controllers\Backend\Cities;

use App\Models\Cities\City;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Cities\CreateResponse;
use App\Http\Responses\Backend\Cities\EditResponse;
use App\Repositories\Backend\Cities\CityRepository;
use App\Http\Requests\Backend\Cities\ManageCityRequest;
use App\Http\Requests\Backend\Cities\CreateCityRequest;
use App\Http\Requests\Backend\Cities\StoreCityRequest;
use App\Http\Requests\Backend\Cities\EditCityRequest;
use App\Http\Requests\Backend\Cities\UpdateCityRequest;
use App\Http\Requests\Backend\Cities\DeleteCityRequest;

/**
 * CitiesController
 */
class CitiesController extends Controller
{
    /**
     * variable to store the repository object
     * @var CityRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Cities\ManageCityRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageCityRequest $request)
    {
        return new ViewResponse('backend.cities.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateCityRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Cities\CreateResponse
     */
    public function create(CreateCityRequest $request)
    {
        return new CreateResponse('backend.cities.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCityRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreCityRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.cities.index'), ['flash_success' => _tr('alerts.backend.cities.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Cities\City  $city
     * @param  EditCityRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Cities\EditResponse
     */
    public function edit(City $city, EditCityRequest $request)
    {
        return new EditResponse($city);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateCityRequestNamespace  $request
     * @param  App\Models\Cities\City  $city
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateCityRequest $request, City $city)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $city, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.cities.index'), ['flash_success' => _tr('alerts.backend.cities.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteCityRequestNamespace  $request
     * @param  App\Models\Cities\City  $city
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(City $city, DeleteCityRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($city);
        //returning with successfull message
        return new RedirectResponse(route('admin.cities.index'), ['flash_success' => _tr('alerts.backend.cities.deleted')]);
    }
    
}

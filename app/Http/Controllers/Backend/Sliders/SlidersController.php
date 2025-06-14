<?php

namespace App\Http\Controllers\Backend\Sliders;

use App\Models\Sliders\Slider;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Sliders\CreateResponse;
use App\Http\Responses\Backend\Sliders\EditResponse;
use App\Repositories\Backend\Sliders\SliderRepository;
use App\Http\Requests\Backend\Sliders\ManageSliderRequest;
use App\Http\Requests\Backend\Sliders\CreateSliderRequest;
use App\Http\Requests\Backend\Sliders\StoreSliderRequest;
use App\Http\Requests\Backend\Sliders\EditSliderRequest;
use App\Http\Requests\Backend\Sliders\UpdateSliderRequest;
use App\Http\Requests\Backend\Sliders\DeleteSliderRequest;

/**
 * SlidersController
 */
class SlidersController extends Controller
{
    /**
     * variable to store the repository object
     * @var SliderRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SliderRepository $repository;
     */
    public function __construct(SliderRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Sliders\ManageSliderRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSliderRequest $request)
    {
        return new ViewResponse('backend.sliders.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSliderRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Sliders\CreateResponse
     */
    public function create(CreateSliderRequest $request)
    {
        return new CreateResponse('backend.sliders.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSliderRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSliderRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
        //Create the model using repository create method
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/sliders','public');
        }
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.sliders.index'), ['flash_success' => _tr('alerts.backend.sliders.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Sliders\Slider  $slider
     * @param  EditSliderRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Sliders\EditResponse
     */
    public function edit($id, EditSliderRequest $request)
    {
        $slider = $this->repository->find($id);
        return new EditResponse($slider);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSliderRequestNamespace  $request
     * @param  App\Models\Sliders\Slider  $slider
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSliderRequest $request, $id)
    {
        $slider = $this->repository->find($id);
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
        //Update the model using repository update method
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/sliders','public');
        }
        if($request->remove_file){
            $input['cover'] = NULL;
        }
        $this->repository->update( $slider, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.sliders.index'), ['flash_success' => _tr('alerts.backend.sliders.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSliderRequestNamespace  $request
     * @param  App\Models\Sliders\Slider  $slider
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Slider $slider, DeleteSliderRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($slider);
        //returning with successfull message
        return new RedirectResponse(route('admin.sliders.index'), ['flash_success' => _tr('alerts.backend.sliders.deleted')]);
    }
    
}

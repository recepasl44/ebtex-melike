<?php

namespace App\Http\Controllers\Backend\Colors;

use App\Models\Colors\Color;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Colors\CreateResponse;
use App\Http\Responses\Backend\Colors\EditResponse;
use App\Repositories\Backend\Colors\ColorRepository;
use App\Http\Requests\Backend\Colors\ManageColorRequest;
use App\Http\Requests\Backend\Colors\CreateColorRequest;
use App\Http\Requests\Backend\Colors\StoreColorRequest;
use App\Http\Requests\Backend\Colors\EditColorRequest;
use App\Http\Requests\Backend\Colors\UpdateColorRequest;
use App\Http\Requests\Backend\Colors\DeleteColorRequest;

/**
 * ColorsController
 */
class ColorsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ColorRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ColorRepository $repository;
     */
    public function __construct(ColorRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Colors\ManageColorRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageColorRequest $request)
    {
        return new ViewResponse('backend.colors.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateColorRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Colors\CreateResponse
     */
    public function create(CreateColorRequest $request)
    {
        return new CreateResponse('backend.colors.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreColorRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreColorRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.colors.index'), ['flash_success' => _tr('alerts.backend.colors.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Colors\Color  $color
     * @param  EditColorRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Colors\EditResponse
     */
    public function edit(Color $color, EditColorRequest $request)
    {
        return new EditResponse($color);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateColorRequestNamespace  $request
     * @param  App\Models\Colors\Color  $color
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateColorRequest $request, Color $color)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $color, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.colors.index'), ['flash_success' => _tr('alerts.backend.colors.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteColorRequestNamespace  $request
     * @param  App\Models\Colors\Color  $color
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Color $color, DeleteColorRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($color);
        //returning with successfull message
        return new RedirectResponse(route('admin.colors.index'), ['flash_success' => _tr('alerts.backend.colors.deleted')]);
    }
    
}

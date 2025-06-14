<?php

namespace App\Http\Controllers\Backend\UsedAreas;

use App\Models\UsedAreas\UsedArea;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\UsedAreas\CreateResponse;
use App\Http\Responses\Backend\UsedAreas\EditResponse;
use App\Repositories\Backend\UsedAreas\UsedAreaRepository;
use App\Http\Requests\Backend\UsedAreas\ManageUsedAreaRequest;
use App\Http\Requests\Backend\UsedAreas\CreateUsedAreaRequest;
use App\Http\Requests\Backend\UsedAreas\StoreUsedAreaRequest;
use App\Http\Requests\Backend\UsedAreas\EditUsedAreaRequest;
use App\Http\Requests\Backend\UsedAreas\UpdateUsedAreaRequest;
use App\Http\Requests\Backend\UsedAreas\DeleteUsedAreaRequest;

/**
 * UsedAreasController
 */
class UsedAreasController extends Controller
{
    /**
     * variable to store the repository object
     * @var UsedAreaRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param UsedAreaRepository $repository;
     */
    public function __construct(UsedAreaRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\UsedAreas\ManageUsedAreaRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageUsedAreaRequest $request)
    {
        return new ViewResponse('backend.usedareas.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateUsedAreaRequestNamespace  $request
     * @return \App\Http\Responses\Backend\UsedAreas\CreateResponse
     */
    public function create(CreateUsedAreaRequest $request)
    {
        return new CreateResponse('backend.usedareas.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreUsedAreaRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreUsedAreaRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.usedareas.index'), ['flash_success' => _tr('alerts.backend.usedareas.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\UsedAreas\UsedArea  $usedarea
     * @param  EditUsedAreaRequestNamespace  $request
     * @return \App\Http\Responses\Backend\UsedAreas\EditResponse
     */
    public function edit(UsedArea $usedarea, EditUsedAreaRequest $request)
    {
        return new EditResponse($usedarea);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateUsedAreaRequestNamespace  $request
     * @param  App\Models\UsedAreas\UsedArea  $usedarea
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateUsedAreaRequest $request, UsedArea $usedarea)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $usedarea, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.usedareas.index'), ['flash_success' => _tr('alerts.backend.usedareas.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteUsedAreaRequestNamespace  $request
     * @param  App\Models\UsedAreas\UsedArea  $usedarea
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(UsedArea $usedarea, DeleteUsedAreaRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($usedarea);
        //returning with successfull message
        return new RedirectResponse(route('admin.usedareas.index'), ['flash_success' => _tr('alerts.backend.usedareas.deleted')]);
    }
    
}

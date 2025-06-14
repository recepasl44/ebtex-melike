<?php

namespace App\Http\Controllers\Backend\Seasons;

use App\Models\Seasons\Season;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Seasons\CreateResponse;
use App\Http\Responses\Backend\Seasons\EditResponse;
use App\Repositories\Backend\Seasons\SeasonRepository;
use App\Http\Requests\Backend\Seasons\ManageSeasonRequest;
use App\Http\Requests\Backend\Seasons\CreateSeasonRequest;
use App\Http\Requests\Backend\Seasons\StoreSeasonRequest;
use App\Http\Requests\Backend\Seasons\EditSeasonRequest;
use App\Http\Requests\Backend\Seasons\UpdateSeasonRequest;
use App\Http\Requests\Backend\Seasons\DeleteSeasonRequest;

/**
 * SeasonsController
 */
class SeasonsController extends Controller
{
    /**
     * variable to store the repository object
     * @var SeasonRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SeasonRepository $repository;
     */
    public function __construct(SeasonRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Seasons\ManageSeasonRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSeasonRequest $request)
    {
        return new ViewResponse('backend.seasons.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSeasonRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Seasons\CreateResponse
     */
    public function create(CreateSeasonRequest $request)
    {
        return new CreateResponse('backend.seasons.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSeasonRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSeasonRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.seasons.index'), ['flash_success' => _tr('alerts.backend.seasons.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Seasons\Season  $season
     * @param  EditSeasonRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Seasons\EditResponse
     */
    public function edit(Season $season, EditSeasonRequest $request)
    {
        return new EditResponse($season);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSeasonRequestNamespace  $request
     * @param  App\Models\Seasons\Season  $season
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSeasonRequest $request, Season $season)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $season, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.seasons.index'), ['flash_success' => _tr('alerts.backend.seasons.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSeasonRequestNamespace  $request
     * @param  App\Models\Seasons\Season  $season
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Season $season, DeleteSeasonRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($season);
        //returning with successfull message
        return new RedirectResponse(route('admin.seasons.index'), ['flash_success' => _tr('alerts.backend.seasons.deleted')]);
    }
    
}

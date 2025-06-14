<?php

namespace App\Http\Controllers\Backend\Achievements;

use App\Models\Achievements\Achievement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Achievements\CreateResponse;
use App\Http\Responses\Backend\Achievements\EditResponse;
use App\Repositories\Backend\Achievements\AchievementRepository;
use App\Http\Requests\Backend\Achievements\ManageAchievementRequest;
use App\Http\Requests\Backend\Achievements\CreateAchievementRequest;
use App\Http\Requests\Backend\Achievements\StoreAchievementRequest;
use App\Http\Requests\Backend\Achievements\EditAchievementRequest;
use App\Http\Requests\Backend\Achievements\UpdateAchievementRequest;
use App\Http\Requests\Backend\Achievements\DeleteAchievementRequest;

/**
 * AchievementsController
 */
class AchievementsController extends Controller
{
    /**
     * variable to store the repository object
     * @var AchievementRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AchievementRepository $repository;
     */
    public function __construct(AchievementRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Achievements\ManageAchievementRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAchievementRequest $request)
    {
        return new ViewResponse('backend.achievements.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAchievementRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Achievements\CreateResponse
     */
    public function create(CreateAchievementRequest $request)
    {
        return new CreateResponse('backend.achievements.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAchievementRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAchievementRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.achievements.index'), ['flash_success' => _tr('alerts.backend.achievements.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Achievements\Achievement  $achievement
     * @param  EditAchievementRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Achievements\EditResponse
     */
    public function edit(Achievement $achievement, EditAchievementRequest $request)
    {
        return new EditResponse($achievement);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAchievementRequestNamespace  $request
     * @param  App\Models\Achievements\Achievement  $achievement
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAchievementRequest $request, Achievement $achievement)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $achievement, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.achievements.index'), ['flash_success' => _tr('alerts.backend.achievements.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAchievementRequestNamespace  $request
     * @param  App\Models\Achievements\Achievement  $achievement
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Achievement $achievement, DeleteAchievementRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($achievement);
        //returning with successfull message
        return new RedirectResponse(route('admin.achievements.index'), ['flash_success' => _tr('alerts.backend.achievements.deleted')]);
    }
    
}

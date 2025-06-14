<?php

namespace App\Http\Controllers\Backend\AcademicTitles;

use App\Models\AcademicTitles\AcademicTitle;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\AcademicTitles\CreateResponse;
use App\Http\Responses\Backend\AcademicTitles\EditResponse;
use App\Repositories\Backend\AcademicTitles\AcademicTitleRepository;
use App\Http\Requests\Backend\AcademicTitles\ManageAcademicTitleRequest;
use App\Http\Requests\Backend\AcademicTitles\CreateAcademicTitleRequest;
use App\Http\Requests\Backend\AcademicTitles\StoreAcademicTitleRequest;
use App\Http\Requests\Backend\AcademicTitles\EditAcademicTitleRequest;
use App\Http\Requests\Backend\AcademicTitles\UpdateAcademicTitleRequest;
use App\Http\Requests\Backend\AcademicTitles\DeleteAcademicTitleRequest;

/**
 * AcademicTitlesController
 */
class AcademicTitlesController extends Controller
{
    /**
     * variable to store the repository object
     * @var AcademicTitleRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AcademicTitleRepository $repository;
     */
    public function __construct(AcademicTitleRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\AcademicTitles\ManageAcademicTitleRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAcademicTitleRequest $request)
    {
        return new ViewResponse('backend.academictitles.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAcademicTitleRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AcademicTitles\CreateResponse
     */
    public function create(CreateAcademicTitleRequest $request)
    {
        return new CreateResponse('backend.academictitles.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAcademicTitleRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAcademicTitleRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.academictitles.index'), ['flash_success' => _tr('alerts.backend.academictitles.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\AcademicTitles\AcademicTitle  $academictitle
     * @param  EditAcademicTitleRequestNamespace  $request
     * @return \App\Http\Responses\Backend\AcademicTitles\EditResponse
     */
    public function edit(AcademicTitle $academictitle, EditAcademicTitleRequest $request)
    {
        return new EditResponse($academictitle);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAcademicTitleRequestNamespace  $request
     * @param  App\Models\AcademicTitles\AcademicTitle  $academictitle
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAcademicTitleRequest $request, AcademicTitle $academictitle)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $academictitle, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.academictitles.index'), ['flash_success' => _tr('alerts.backend.academictitles.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAcademicTitleRequestNamespace  $request
     * @param  App\Models\AcademicTitles\AcademicTitle  $academictitle
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(AcademicTitle $academictitle, DeleteAcademicTitleRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($academictitle);
        //returning with successfull message
        return new RedirectResponse(route('admin.academictitles.index'), ['flash_success' => _tr('alerts.backend.academictitles.deleted')]);
    }
    
}

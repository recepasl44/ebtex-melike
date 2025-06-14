<?php

namespace App\Http\Controllers\Backend\Professions;

use App\Models\Professions\Profession;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Professions\CreateResponse;
use App\Http\Responses\Backend\Professions\EditResponse;
use App\Repositories\Backend\Professions\ProfessionRepository;
use App\Http\Requests\Backend\Professions\ManageProfessionRequest;
use App\Http\Requests\Backend\Professions\CreateProfessionRequest;
use App\Http\Requests\Backend\Professions\StoreProfessionRequest;
use App\Http\Requests\Backend\Professions\EditProfessionRequest;
use App\Http\Requests\Backend\Professions\UpdateProfessionRequest;
use App\Http\Requests\Backend\Professions\DeleteProfessionRequest;

/**
 * ProfessionsController
 */
class ProfessionsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ProfessionRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ProfessionRepository $repository;
     */
    public function __construct(ProfessionRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Professions\ManageProfessionRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageProfessionRequest $request)
    {
        return new ViewResponse('backend.professions.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateProfessionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Professions\CreateResponse
     */
    public function create(CreateProfessionRequest $request)
    {
        return new CreateResponse('backend.professions.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreProfessionRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreProfessionRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.professions.index'), ['flash_success' => _tr('alerts.backend.professions.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Professions\Profession  $profession
     * @param  EditProfessionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Professions\EditResponse
     */
    public function edit(Profession $profession, EditProfessionRequest $request)
    {
        return new EditResponse($profession);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateProfessionRequestNamespace  $request
     * @param  App\Models\Professions\Profession  $profession
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateProfessionRequest $request, Profession $profession)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $profession, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.professions.index'), ['flash_success' => _tr('alerts.backend.professions.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteProfessionRequestNamespace  $request
     * @param  App\Models\Professions\Profession  $profession
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Profession $profession, DeleteProfessionRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($profession);
        //returning with successfull message
        return new RedirectResponse(route('admin.professions.index'), ['flash_success' => _tr('alerts.backend.professions.deleted')]);
    }
    
}

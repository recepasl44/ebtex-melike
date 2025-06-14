<?php

namespace App\Http\Controllers\Backend\ScholarshipSettings;

use App\Models\ScholarshipSettings\ScholarshipSetting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ScholarshipSettings\CreateResponse;
use App\Http\Responses\Backend\ScholarshipSettings\EditResponse;
use App\Repositories\Backend\ScholarshipSettings\ScholarshipSettingRepository;
use App\Http\Requests\Backend\ScholarshipSettings\ManageScholarshipSettingRequest;
use App\Http\Requests\Backend\ScholarshipSettings\CreateScholarshipSettingRequest;
use App\Http\Requests\Backend\ScholarshipSettings\StoreScholarshipSettingRequest;
use App\Http\Requests\Backend\ScholarshipSettings\EditScholarshipSettingRequest;
use App\Http\Requests\Backend\ScholarshipSettings\UpdateScholarshipSettingRequest;
use App\Http\Requests\Backend\ScholarshipSettings\DeleteScholarshipSettingRequest;

/**
 * ScholarshipSettingsController
 */
class ScholarshipSettingsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScholarshipSettingRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ScholarshipSettingRepository $repository;
     */
    public function __construct(ScholarshipSettingRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ScholarshipSettings\ManageScholarshipSettingRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageScholarshipSettingRequest $request)
    {
        return new ViewResponse('backend.scholarshipsettings.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateScholarshipSettingRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ScholarshipSettings\CreateResponse
     */
    public function create(CreateScholarshipSettingRequest $request)
    {
        return new CreateResponse('backend.scholarshipsettings.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreScholarshipSettingRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreScholarshipSettingRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.scholarshipsettings.index'), ['flash_success' => _tr('alerts.backend.scholarshipsettings.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ScholarshipSettings\ScholarshipSetting  $scholarshipsetting
     * @param  EditScholarshipSettingRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ScholarshipSettings\EditResponse
     */
    public function edit(ScholarshipSetting $scholarshipsetting, EditScholarshipSettingRequest $request)
    {
        return new EditResponse($scholarshipsetting);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateScholarshipSettingRequestNamespace  $request
     * @param  App\Models\ScholarshipSettings\ScholarshipSetting  $scholarshipsetting
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateScholarshipSettingRequest $request, ScholarshipSetting $scholarshipsetting)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $scholarshipsetting, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.scholarshipsettings.index'), ['flash_success' => _tr('alerts.backend.scholarshipsettings.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteScholarshipSettingRequestNamespace  $request
     * @param  App\Models\ScholarshipSettings\ScholarshipSetting  $scholarshipsetting
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ScholarshipSetting $scholarshipsetting, DeleteScholarshipSettingRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($scholarshipsetting);
        //returning with successfull message
        return new RedirectResponse(route('admin.scholarshipsettings.index'), ['flash_success' => _tr('alerts.backend.scholarshipsettings.deleted')]);
    }
    
}

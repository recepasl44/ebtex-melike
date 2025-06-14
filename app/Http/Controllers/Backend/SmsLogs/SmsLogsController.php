<?php

namespace App\Http\Controllers\Backend\SmsLogs;

use App\Models\SmsLogs\SmsLog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\SmsLogs\CreateResponse;
use App\Http\Responses\Backend\SmsLogs\EditResponse;
use App\Repositories\Backend\SmsLogs\SmsLogRepository;
use App\Http\Requests\Backend\SmsLogs\ManageSmsLogRequest;
use App\Http\Requests\Backend\SmsLogs\CreateSmsLogRequest;
use App\Http\Requests\Backend\SmsLogs\StoreSmsLogRequest;
use App\Http\Requests\Backend\SmsLogs\EditSmsLogRequest;
use App\Http\Requests\Backend\SmsLogs\UpdateSmsLogRequest;
use App\Http\Requests\Backend\SmsLogs\DeleteSmsLogRequest;

/**
 * SmsLogsController
 */
class SmsLogsController extends Controller
{
    /**
     * variable to store the repository object
     * @var SmsLogRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SmsLogRepository $repository;
     */
    public function __construct(SmsLogRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\SmsLogs\ManageSmsLogRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSmsLogRequest $request)
    {
        return new ViewResponse('backend.smslogs.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSmsLogRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SmsLogs\CreateResponse
     */
    public function create(CreateSmsLogRequest $request)
    {
        return new CreateResponse('backend.smslogs.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSmsLogRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSmsLogRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.smslogs.index'), ['flash_success' => _tr('alerts.backend.smslogs.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\SmsLogs\SmsLog  $smslog
     * @param  EditSmsLogRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SmsLogs\EditResponse
     */
    public function edit(SmsLog $smslog, EditSmsLogRequest $request)
    {
        return new EditResponse($smslog);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSmsLogRequestNamespace  $request
     * @param  App\Models\SmsLogs\SmsLog  $smslog
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSmsLogRequest $request, SmsLog $smslog)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $smslog, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.smslogs.index'), ['flash_success' => _tr('alerts.backend.smslogs.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSmsLogRequestNamespace  $request
     * @param  App\Models\SmsLogs\SmsLog  $smslog
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(SmsLog $smslog, DeleteSmsLogRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($smslog);
        //returning with successfull message
        return new RedirectResponse(route('admin.smslogs.index'), ['flash_success' => _tr('alerts.backend.smslogs.deleted')]);
    }
    
}

<?php

namespace App\Http\Controllers\Backend\Subscribes;

use App\Models\Subscribes\Subscribe;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Subscribes\CreateResponse;
use App\Http\Responses\Backend\Subscribes\EditResponse;
use App\Repositories\Backend\Subscribes\SubscribeRepository;
use App\Http\Requests\Backend\Subscribes\ManageSubscribeRequest;
use App\Http\Requests\Backend\Subscribes\CreateSubscribeRequest;
use App\Http\Requests\Backend\Subscribes\StoreSubscribeRequest;
use App\Http\Requests\Backend\Subscribes\EditSubscribeRequest;
use App\Http\Requests\Backend\Subscribes\UpdateSubscribeRequest;
use App\Http\Requests\Backend\Subscribes\DeleteSubscribeRequest;

/**
 * SubscribesController
 */
class SubscribesController extends Controller
{
    /**
     * variable to store the repository object
     * @var SubscribeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SubscribeRepository $repository;
     */
    public function __construct(SubscribeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Subscribes\ManageSubscribeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSubscribeRequest $request)
    {
        return new ViewResponse('backend.subscribes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSubscribeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Subscribes\CreateResponse
     */
    public function create(CreateSubscribeRequest $request)
    {
        return new CreateResponse('backend.subscribes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSubscribeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSubscribeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.subscribes.index'), ['flash_success' => _tr('alerts.backend.subscribes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Subscribes\Subscribe  $subscribe
     * @param  EditSubscribeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Subscribes\EditResponse
     */
    public function edit(Subscribe $subscribe, EditSubscribeRequest $request)
    {
        return new EditResponse($subscribe);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSubscribeRequestNamespace  $request
     * @param  App\Models\Subscribes\Subscribe  $subscribe
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSubscribeRequest $request, Subscribe $subscribe)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $subscribe, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.subscribes.index'), ['flash_success' => _tr('alerts.backend.subscribes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSubscribeRequestNamespace  $request
     * @param  App\Models\Subscribes\Subscribe  $subscribe
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Subscribe $subscribe, DeleteSubscribeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($subscribe);
        //returning with successfull message
        return new RedirectResponse(route('admin.subscribes.index'), ['flash_success' => _tr('alerts.backend.subscribes.deleted')]);
    }
    
}

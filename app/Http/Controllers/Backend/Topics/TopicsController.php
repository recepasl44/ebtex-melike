<?php

namespace App\Http\Controllers\Backend\Topics;

use App\Models\Topics\Topic;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Topics\CreateResponse;
use App\Http\Responses\Backend\Topics\EditResponse;
use App\Repositories\Backend\Topics\TopicRepository;
use App\Http\Requests\Backend\Topics\ManageTopicRequest;
use App\Http\Requests\Backend\Topics\CreateTopicRequest;
use App\Http\Requests\Backend\Topics\StoreTopicRequest;
use App\Http\Requests\Backend\Topics\EditTopicRequest;
use App\Http\Requests\Backend\Topics\UpdateTopicRequest;
use App\Http\Requests\Backend\Topics\DeleteTopicRequest;

/**
 * TopicsController
 */
class TopicsController extends Controller
{
    /**
     * variable to store the repository object
     * @var TopicRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TopicRepository $repository;
     */
    public function __construct(TopicRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Topics\ManageTopicRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageTopicRequest $request)
    {
        return new ViewResponse('backend.topics.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateTopicRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Topics\CreateResponse
     */
    public function create(CreateTopicRequest $request)
    {
        return new CreateResponse('backend.topics.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreTopicRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreTopicRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.topics.index'), ['flash_success' => _tr('alerts.backend.topics.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Topics\Topic  $topic
     * @param  EditTopicRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Topics\EditResponse
     */
    public function edit(Topic $topic, EditTopicRequest $request)
    {
        return new EditResponse($topic);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateTopicRequestNamespace  $request
     * @param  App\Models\Topics\Topic  $topic
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateTopicRequest $request, Topic $topic)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $topic, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.topics.index'), ['flash_success' => _tr('alerts.backend.topics.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteTopicRequestNamespace  $request
     * @param  App\Models\Topics\Topic  $topic
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Topic $topic, DeleteTopicRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($topic);
        //returning with successfull message
        return new RedirectResponse(route('admin.topics.index'), ['flash_success' => _tr('alerts.backend.topics.deleted')]);
    }
    
}

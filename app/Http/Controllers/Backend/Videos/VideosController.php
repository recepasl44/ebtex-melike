<?php

namespace App\Http\Controllers\Backend\Videos;

use App\Models\Videos\Video;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Videos\CreateResponse;
use App\Http\Responses\Backend\Videos\EditResponse;
use App\Repositories\Backend\Videos\VideoRepository;
use App\Http\Requests\Backend\Videos\ManageVideoRequest;
use App\Http\Requests\Backend\Videos\CreateVideoRequest;
use App\Http\Requests\Backend\Videos\StoreVideoRequest;
use App\Http\Requests\Backend\Videos\EditVideoRequest;
use App\Http\Requests\Backend\Videos\UpdateVideoRequest;
use App\Http\Requests\Backend\Videos\DeleteVideoRequest;

/**
 * VideosController
 */
class VideosController extends Controller
{
    /**
     * variable to store the repository object
     * @var VideoRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param VideoRepository $repository;
     */
    public function __construct(VideoRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Videos\ManageVideoRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageVideoRequest $request)
    {
        return new ViewResponse('backend.videos.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateVideoRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Videos\CreateResponse
     */
    public function create(CreateVideoRequest $request)
    {
        return new CreateResponse('backend.videos.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreVideoRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreVideoRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.videos.index'), ['flash_success' => _tr('alerts.backend.videos.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Videos\Video  $video
     * @param  EditVideoRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Videos\EditResponse
     */
    public function edit(Video $video, EditVideoRequest $request)
    {
        return new EditResponse($video);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateVideoRequestNamespace  $request
     * @param  App\Models\Videos\Video  $video
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateVideoRequest $request, Video $video)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $video, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.videos.index'), ['flash_success' => _tr('alerts.backend.videos.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteVideoRequestNamespace  $request
     * @param  App\Models\Videos\Video  $video
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Video $video, DeleteVideoRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($video);
        //returning with successfull message
        return new RedirectResponse(route('admin.videos.index'), ['flash_success' => _tr('alerts.backend.videos.deleted')]);
    }
    
}

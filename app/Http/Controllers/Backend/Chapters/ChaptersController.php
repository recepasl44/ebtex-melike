<?php

namespace App\Http\Controllers\Backend\Chapters;

use App\Models\Chapters\Chapter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Chapters\CreateResponse;
use App\Http\Responses\Backend\Chapters\EditResponse;
use App\Repositories\Backend\Chapters\ChapterRepository;
use App\Http\Requests\Backend\Chapters\ManageChapterRequest;
use App\Http\Requests\Backend\Chapters\CreateChapterRequest;
use App\Http\Requests\Backend\Chapters\StoreChapterRequest;
use App\Http\Requests\Backend\Chapters\EditChapterRequest;
use App\Http\Requests\Backend\Chapters\UpdateChapterRequest;
use App\Http\Requests\Backend\Chapters\DeleteChapterRequest;

/**
 * ChaptersController
 */
class ChaptersController extends Controller
{
    /**
     * variable to store the repository object
     * @var ChapterRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ChapterRepository $repository;
     */
    public function __construct(ChapterRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Chapters\ManageChapterRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageChapterRequest $request)
    {
        return new ViewResponse('backend.chapters.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateChapterRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Chapters\CreateResponse
     */
    public function create(CreateChapterRequest $request)
    {
        return new CreateResponse('backend.chapters.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreChapterRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreChapterRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.chapters.index'), ['flash_success' => _tr('alerts.backend.chapters.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Chapters\Chapter  $chapter
     * @param  EditChapterRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Chapters\EditResponse
     */
    public function edit(Chapter $chapter, EditChapterRequest $request)
    {
        return new EditResponse($chapter);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateChapterRequestNamespace  $request
     * @param  App\Models\Chapters\Chapter  $chapter
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateChapterRequest $request, Chapter $chapter)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $chapter, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.chapters.index'), ['flash_success' => _tr('alerts.backend.chapters.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteChapterRequestNamespace  $request
     * @param  App\Models\Chapters\Chapter  $chapter
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Chapter $chapter, DeleteChapterRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($chapter);
        //returning with successfull message
        return new RedirectResponse(route('admin.chapters.index'), ['flash_success' => _tr('alerts.backend.chapters.deleted')]);
    }
    
}

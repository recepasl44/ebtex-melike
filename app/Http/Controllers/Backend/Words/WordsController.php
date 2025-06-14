<?php

namespace App\Http\Controllers\Backend\Words;

use App\Models\Words\Word;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Words\CreateResponse;
use App\Http\Responses\Backend\Words\EditResponse;
use App\Repositories\Backend\Words\WordRepository;
use App\Http\Requests\Backend\Words\ManageWordRequest;
use App\Http\Requests\Backend\Words\CreateWordRequest;
use App\Http\Requests\Backend\Words\StoreWordRequest;
use App\Http\Requests\Backend\Words\EditWordRequest;
use App\Http\Requests\Backend\Words\UpdateWordRequest;
use App\Http\Requests\Backend\Words\DeleteWordRequest;

/**
 * WordsController
 */
class WordsController extends Controller
{
    /**
     * variable to store the repository object
     * @var WordRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param WordRepository $repository;
     */
    public function __construct(WordRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Words\ManageWordRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageWordRequest $request)
    {
        return new ViewResponse('backend.words.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateWordRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Words\CreateResponse
     */
    public function create(CreateWordRequest $request)
    {
        return new CreateResponse('backend.words.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreWordRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreWordRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.words.index'), ['flash_success' => _tr('alerts.backend.words.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Words\Word  $word
     * @param  EditWordRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Words\EditResponse
     */
    public function edit(Word $word, EditWordRequest $request)
    {
        return new EditResponse($word);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateWordRequestNamespace  $request
     * @param  App\Models\Words\Word  $word
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateWordRequest $request, Word $word)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $word, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.words.index'), ['flash_success' => _tr('alerts.backend.words.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteWordRequestNamespace  $request
     * @param  App\Models\Words\Word  $word
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Word $word, DeleteWordRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($word);
        //returning with successfull message
        return new RedirectResponse(route('admin.words.index'), ['flash_success' => _tr('alerts.backend.words.deleted')]);
    }
    
}

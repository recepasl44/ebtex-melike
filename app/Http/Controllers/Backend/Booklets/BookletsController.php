<?php

namespace App\Http\Controllers\Backend\Booklets;

use App\Models\Booklets\Booklet;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Booklets\CreateResponse;
use App\Http\Responses\Backend\Booklets\EditResponse;
use App\Repositories\Backend\Booklets\BookletRepository;
use App\Http\Requests\Backend\Booklets\ManageBookletRequest;
use App\Http\Requests\Backend\Booklets\CreateBookletRequest;
use App\Http\Requests\Backend\Booklets\StoreBookletRequest;
use App\Http\Requests\Backend\Booklets\EditBookletRequest;
use App\Http\Requests\Backend\Booklets\UpdateBookletRequest;
use App\Http\Requests\Backend\Booklets\DeleteBookletRequest;

/**
 * BookletsController
 */
class BookletsController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookletRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookletRepository $repository;
     */
    public function __construct(BookletRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Booklets\ManageBookletRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageBookletRequest $request)
    {
        return new ViewResponse('backend.booklets.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateBookletRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Booklets\CreateResponse
     */
    public function create(CreateBookletRequest $request)
    {
        return new CreateResponse('backend.booklets.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreBookletRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreBookletRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.booklets.index'), ['flash_success' => _tr('alerts.backend.booklets.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Booklets\Booklet  $booklet
     * @param  EditBookletRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Booklets\EditResponse
     */
    public function edit(Booklet $booklet, EditBookletRequest $request)
    {
        return new EditResponse($booklet);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateBookletRequestNamespace  $request
     * @param  App\Models\Booklets\Booklet  $booklet
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateBookletRequest $request, Booklet $booklet)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $booklet, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.booklets.index'), ['flash_success' => _tr('alerts.backend.booklets.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteBookletRequestNamespace  $request
     * @param  App\Models\Booklets\Booklet  $booklet
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Booklet $booklet, DeleteBookletRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($booklet);
        //returning with successfull message
        return new RedirectResponse(route('admin.booklets.index'), ['flash_success' => _tr('alerts.backend.booklets.deleted')]);
    }
    
}

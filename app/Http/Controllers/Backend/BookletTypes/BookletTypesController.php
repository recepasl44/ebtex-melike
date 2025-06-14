<?php

namespace App\Http\Controllers\Backend\BookletTypes;

use App\Models\BookletTypes\BookletType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\BookletTypes\CreateResponse;
use App\Http\Responses\Backend\BookletTypes\EditResponse;
use App\Repositories\Backend\BookletTypes\BookletTypeRepository;
use App\Http\Requests\Backend\BookletTypes\ManageBookletTypeRequest;
use App\Http\Requests\Backend\BookletTypes\CreateBookletTypeRequest;
use App\Http\Requests\Backend\BookletTypes\StoreBookletTypeRequest;
use App\Http\Requests\Backend\BookletTypes\EditBookletTypeRequest;
use App\Http\Requests\Backend\BookletTypes\UpdateBookletTypeRequest;
use App\Http\Requests\Backend\BookletTypes\DeleteBookletTypeRequest;

/**
 * BookletTypesController
 */
class BookletTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookletTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookletTypeRepository $repository;
     */
    public function __construct(BookletTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\BookletTypes\ManageBookletTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageBookletTypeRequest $request)
    {
        return new ViewResponse('backend.booklettypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateBookletTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\BookletTypes\CreateResponse
     */
    public function create(CreateBookletTypeRequest $request)
    {
        return new CreateResponse('backend.booklettypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreBookletTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreBookletTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.booklettypes.index'), ['flash_success' => _tr('alerts.backend.booklettypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\BookletTypes\BookletType  $booklettype
     * @param  EditBookletTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\BookletTypes\EditResponse
     */
    public function edit(BookletType $booklettype, EditBookletTypeRequest $request)
    {
        return new EditResponse($booklettype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateBookletTypeRequestNamespace  $request
     * @param  App\Models\BookletTypes\BookletType  $booklettype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateBookletTypeRequest $request, BookletType $booklettype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $booklettype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.booklettypes.index'), ['flash_success' => _tr('alerts.backend.booklettypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteBookletTypeRequestNamespace  $request
     * @param  App\Models\BookletTypes\BookletType  $booklettype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(BookletType $booklettype, DeleteBookletTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($booklettype);
        //returning with successfull message
        return new RedirectResponse(route('admin.booklettypes.index'), ['flash_success' => _tr('alerts.backend.booklettypes.deleted')]);
    }
    
}

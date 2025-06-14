<?php

namespace App\Http\Controllers\Backend\BookPackages;

use App\Models\BookPackages\BookPackage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\BookPackages\CreateResponse;
use App\Http\Responses\Backend\BookPackages\EditResponse;
use App\Repositories\Backend\BookPackages\BookPackageRepository;
use App\Http\Requests\Backend\BookPackages\ManageBookPackageRequest;
use App\Http\Requests\Backend\BookPackages\CreateBookPackageRequest;
use App\Http\Requests\Backend\BookPackages\StoreBookPackageRequest;
use App\Http\Requests\Backend\BookPackages\EditBookPackageRequest;
use App\Http\Requests\Backend\BookPackages\UpdateBookPackageRequest;
use App\Http\Requests\Backend\BookPackages\DeleteBookPackageRequest;

/**
 * BookPackagesController
 */
class BookPackagesController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookPackageRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookPackageRepository $repository;
     */
    public function __construct(BookPackageRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\BookPackages\ManageBookPackageRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageBookPackageRequest $request)
    {
        return new ViewResponse('backend.bookpackages.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateBookPackageRequestNamespace  $request
     * @return \App\Http\Responses\Backend\BookPackages\CreateResponse
     */
    public function create(CreateBookPackageRequest $request)
    {
        return new CreateResponse('backend.bookpackages.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreBookPackageRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreBookPackageRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.bookpackages.index'), ['flash_success' => _tr('alerts.backend.bookpackages.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\BookPackages\BookPackage  $bookpackage
     * @param  EditBookPackageRequestNamespace  $request
     * @return \App\Http\Responses\Backend\BookPackages\EditResponse
     */
    public function edit(BookPackage $bookpackage, EditBookPackageRequest $request)
    {
        return new EditResponse($bookpackage);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateBookPackageRequestNamespace  $request
     * @param  App\Models\BookPackages\BookPackage  $bookpackage
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateBookPackageRequest $request, BookPackage $bookpackage)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $bookpackage, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.bookpackages.index'), ['flash_success' => _tr('alerts.backend.bookpackages.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteBookPackageRequestNamespace  $request
     * @param  App\Models\BookPackages\BookPackage  $bookpackage
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(BookPackage $bookpackage, DeleteBookPackageRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($bookpackage);
        //returning with successfull message
        return new RedirectResponse(route('admin.bookpackages.index'), ['flash_success' => _tr('alerts.backend.bookpackages.deleted')]);
    }
    
}

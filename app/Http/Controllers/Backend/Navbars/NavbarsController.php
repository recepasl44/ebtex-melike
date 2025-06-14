<?php

namespace App\Http\Controllers\Backend\Navbars;

use App\Models\Navbars\Navbar;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Navbars\CreateResponse;
use App\Http\Responses\Backend\Navbars\EditResponse;
use App\Repositories\Backend\Navbars\NavbarRepository;
use App\Http\Requests\Backend\Navbars\ManageNavbarRequest;
use App\Http\Requests\Backend\Navbars\CreateNavbarRequest;
use App\Http\Requests\Backend\Navbars\StoreNavbarRequest;
use App\Http\Requests\Backend\Navbars\EditNavbarRequest;
use App\Http\Requests\Backend\Navbars\UpdateNavbarRequest;
use App\Http\Requests\Backend\Navbars\DeleteNavbarRequest;

/**
 * NavbarsController
 */
class NavbarsController extends Controller
{
    /**
     * variable to store the repository object
     * @var NavbarRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param NavbarRepository $repository;
     */
    public function __construct(NavbarRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Navbars\ManageNavbarRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageNavbarRequest $request)
    {
        return new ViewResponse('backend.navbars.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateNavbarRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Navbars\CreateResponse
     */
    public function create(CreateNavbarRequest $request)
    {
        return new CreateResponse('backend.navbars.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreNavbarRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreNavbarRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.navbars.index'), ['flash_success' => _tr('alerts.backend.navbars.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Navbars\Navbar  $navbar
     * @param  EditNavbarRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Navbars\EditResponse
     */
    public function edit(Navbar $navbar, EditNavbarRequest $request)
    {
        return new EditResponse($navbar);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateNavbarRequestNamespace  $request
     * @param  App\Models\Navbars\Navbar  $navbar
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateNavbarRequest $request, Navbar $navbar)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $navbar, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.navbars.index'), ['flash_success' => _tr('alerts.backend.navbars.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteNavbarRequestNamespace  $request
     * @param  App\Models\Navbars\Navbar  $navbar
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Navbar $navbar, DeleteNavbarRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($navbar);
        //returning with successfull message
        return new RedirectResponse(route('admin.navbars.index'), ['flash_success' => _tr('alerts.backend.navbars.deleted')]);
    }
    
}

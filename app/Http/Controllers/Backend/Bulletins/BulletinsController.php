<?php

namespace App\Http\Controllers\Backend\Bulletins;

use App\Models\Bulletins\Bulletin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Bulletins\CreateResponse;
use App\Http\Responses\Backend\Bulletins\EditResponse;
use App\Repositories\Backend\Bulletins\BulletinRepository;
use App\Http\Requests\Backend\Bulletins\ManageBulletinRequest;
use App\Http\Requests\Backend\Bulletins\CreateBulletinRequest;
use App\Http\Requests\Backend\Bulletins\StoreBulletinRequest;
use App\Http\Requests\Backend\Bulletins\EditBulletinRequest;
use App\Http\Requests\Backend\Bulletins\UpdateBulletinRequest;
use App\Http\Requests\Backend\Bulletins\DeleteBulletinRequest;

/**
 * BulletinsController
 */
class BulletinsController extends Controller
{
    /**
     * variable to store the repository object
     * @var BulletinRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BulletinRepository $repository;
     */
    public function __construct(BulletinRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Bulletins\ManageBulletinRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageBulletinRequest $request)
    {
        return new ViewResponse('backend.bulletins.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateBulletinRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Bulletins\CreateResponse
     */
    public function create(CreateBulletinRequest $request)
    {
        return new CreateResponse('backend.bulletins.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreBulletinRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreBulletinRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.bulletins.index'), ['flash_success' => _tr('alerts.backend.bulletins.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Bulletins\Bulletin  $bulletin
     * @param  EditBulletinRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Bulletins\EditResponse
     */
    public function edit(Bulletin $bulletin, EditBulletinRequest $request)
    {
        return new EditResponse($bulletin);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateBulletinRequestNamespace  $request
     * @param  App\Models\Bulletins\Bulletin  $bulletin
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateBulletinRequest $request, Bulletin $bulletin)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $bulletin, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.bulletins.index'), ['flash_success' => _tr('alerts.backend.bulletins.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteBulletinRequestNamespace  $request
     * @param  App\Models\Bulletins\Bulletin  $bulletin
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Bulletin $bulletin, DeleteBulletinRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($bulletin);
        //returning with successfull message
        return new RedirectResponse(route('admin.bulletins.index'), ['flash_success' => _tr('alerts.backend.bulletins.deleted')]);
    }
    
}

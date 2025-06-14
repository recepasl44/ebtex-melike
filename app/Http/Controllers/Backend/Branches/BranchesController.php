<?php

namespace App\Http\Controllers\Backend\Branches;

use App\Models\Branches\Branche;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Branches\CreateResponse;
use App\Http\Responses\Backend\Branches\EditResponse;
use App\Repositories\Backend\Branches\BrancheRepository;
use App\Http\Requests\Backend\Branches\ManageBrancheRequest;
use App\Http\Requests\Backend\Branches\CreateBrancheRequest;
use App\Http\Requests\Backend\Branches\StoreBrancheRequest;
use App\Http\Requests\Backend\Branches\EditBrancheRequest;
use App\Http\Requests\Backend\Branches\UpdateBrancheRequest;
use App\Http\Requests\Backend\Branches\DeleteBrancheRequest;

/**
 * BranchesController
 */
class BranchesController extends Controller
{
    /**
     * variable to store the repository object
     * @var BrancheRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BrancheRepository $repository;
     */
    public function __construct(BrancheRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Branches\ManageBrancheRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageBrancheRequest $request)
    {
        return new ViewResponse('backend.branches.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateBrancheRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Branches\CreateResponse
     */
    public function create(CreateBrancheRequest $request)
    {
        return new CreateResponse('backend.branches.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreBrancheRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreBrancheRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.branches.index'), ['flash_success' => _tr('alerts.backend.branches.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Branches\Branche  $branche
     * @param  EditBrancheRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Branches\EditResponse
     */
    public function edit(Branche $branche, EditBrancheRequest $request)
    {
        return new EditResponse($branche);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateBrancheRequestNamespace  $request
     * @param  App\Models\Branches\Branche  $branche
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateBrancheRequest $request, Branche $branche)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $branche, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.branches.index'), ['flash_success' => _tr('alerts.backend.branches.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteBrancheRequestNamespace  $request
     * @param  App\Models\Branches\Branche  $branche
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Branche $branche, DeleteBrancheRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($branche);
        //returning with successfull message
        return new RedirectResponse(route('admin.branches.index'), ['flash_success' => _tr('alerts.backend.branches.deleted')]);
    }
    
}

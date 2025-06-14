<?php

namespace App\Http\Controllers\Backend\Writers;

use App\Models\Writers\Writer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Writers\CreateResponse;
use App\Http\Responses\Backend\Writers\EditResponse;
use App\Repositories\Backend\Writers\WriterRepository;
use App\Http\Requests\Backend\Writers\ManageWriterRequest;
use App\Http\Requests\Backend\Writers\CreateWriterRequest;
use App\Http\Requests\Backend\Writers\StoreWriterRequest;
use App\Http\Requests\Backend\Writers\EditWriterRequest;
use App\Http\Requests\Backend\Writers\UpdateWriterRequest;
use App\Http\Requests\Backend\Writers\DeleteWriterRequest;

/**
 * WritersController
 */
class WritersController extends Controller
{
    /**
     * variable to store the repository object
     * @var WriterRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param WriterRepository $repository;
     */
    public function __construct(WriterRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Writers\ManageWriterRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageWriterRequest $request)
    {
        return new ViewResponse('backend.writers.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateWriterRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Writers\CreateResponse
     */
    public function create(CreateWriterRequest $request)
    {
        return new CreateResponse('backend.writers.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreWriterRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreWriterRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.writers.index'), ['flash_success' => _tr('alerts.backend.writers.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Writers\Writer  $writer
     * @param  EditWriterRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Writers\EditResponse
     */
    public function edit(Writer $writer, EditWriterRequest $request)
    {
        return new EditResponse($writer);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateWriterRequestNamespace  $request
     * @param  App\Models\Writers\Writer  $writer
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateWriterRequest $request, Writer $writer)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $writer, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.writers.index'), ['flash_success' => _tr('alerts.backend.writers.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteWriterRequestNamespace  $request
     * @param  App\Models\Writers\Writer  $writer
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Writer $writer, DeleteWriterRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($writer);
        //returning with successfull message
        return new RedirectResponse(route('admin.writers.index'), ['flash_success' => _tr('alerts.backend.writers.deleted')]);
    }
    
}

<?php

namespace App\Http\Controllers\Backend\QuestionTypes;

use App\Models\QuestionTypes\QuestionType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuestionTypes\CreateResponse;
use App\Http\Responses\Backend\QuestionTypes\EditResponse;
use App\Repositories\Backend\QuestionTypes\QuestionTypeRepository;
use App\Http\Requests\Backend\QuestionTypes\ManageQuestionTypeRequest;
use App\Http\Requests\Backend\QuestionTypes\CreateQuestionTypeRequest;
use App\Http\Requests\Backend\QuestionTypes\StoreQuestionTypeRequest;
use App\Http\Requests\Backend\QuestionTypes\EditQuestionTypeRequest;
use App\Http\Requests\Backend\QuestionTypes\UpdateQuestionTypeRequest;
use App\Http\Requests\Backend\QuestionTypes\DeleteQuestionTypeRequest;

/**
 * QuestionTypesController
 */
class QuestionTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuestionTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuestionTypeRepository $repository;
     */
    public function __construct(QuestionTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuestionTypes\ManageQuestionTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuestionTypeRequest $request)
    {
        return new ViewResponse('backend.questiontypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuestionTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuestionTypes\CreateResponse
     */
    public function create(CreateQuestionTypeRequest $request)
    {
        return new CreateResponse('backend.questiontypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuestionTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuestionTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.questiontypes.index'), ['flash_success' => _tr('alerts.backend.questiontypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuestionTypes\QuestionType  $questiontype
     * @param  EditQuestionTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuestionTypes\EditResponse
     */
    public function edit(QuestionType $questiontype, EditQuestionTypeRequest $request)
    {
        return new EditResponse($questiontype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuestionTypeRequestNamespace  $request
     * @param  App\Models\QuestionTypes\QuestionType  $questiontype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuestionTypeRequest $request, QuestionType $questiontype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $questiontype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.questiontypes.index'), ['flash_success' => _tr('alerts.backend.questiontypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuestionTypeRequestNamespace  $request
     * @param  App\Models\QuestionTypes\QuestionType  $questiontype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuestionType $questiontype, DeleteQuestionTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($questiontype);
        //returning with successfull message
        return new RedirectResponse(route('admin.questiontypes.index'), ['flash_success' => _tr('alerts.backend.questiontypes.deleted')]);
    }
    
}

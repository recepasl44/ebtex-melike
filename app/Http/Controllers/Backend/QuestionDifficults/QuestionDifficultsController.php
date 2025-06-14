<?php

namespace App\Http\Controllers\Backend\QuestionDifficults;

use App\Models\QuestionDifficults\QuestionDifficult;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuestionDifficults\CreateResponse;
use App\Http\Responses\Backend\QuestionDifficults\EditResponse;
use App\Repositories\Backend\QuestionDifficults\QuestionDifficultRepository;
use App\Http\Requests\Backend\QuestionDifficults\ManageQuestionDifficultRequest;
use App\Http\Requests\Backend\QuestionDifficults\CreateQuestionDifficultRequest;
use App\Http\Requests\Backend\QuestionDifficults\StoreQuestionDifficultRequest;
use App\Http\Requests\Backend\QuestionDifficults\EditQuestionDifficultRequest;
use App\Http\Requests\Backend\QuestionDifficults\UpdateQuestionDifficultRequest;
use App\Http\Requests\Backend\QuestionDifficults\DeleteQuestionDifficultRequest;

/**
 * QuestionDifficultsController
 */
class QuestionDifficultsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuestionDifficultRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuestionDifficultRepository $repository;
     */
    public function __construct(QuestionDifficultRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuestionDifficults\ManageQuestionDifficultRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuestionDifficultRequest $request)
    {
        return new ViewResponse('backend.questiondifficults.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuestionDifficultRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuestionDifficults\CreateResponse
     */
    public function create(CreateQuestionDifficultRequest $request)
    {
        return new CreateResponse('backend.questiondifficults.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuestionDifficultRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuestionDifficultRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.questiondifficults.index'), ['flash_success' => _tr('alerts.backend.questiondifficults.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuestionDifficults\QuestionDifficult  $questiondifficult
     * @param  EditQuestionDifficultRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuestionDifficults\EditResponse
     */
    public function edit(QuestionDifficult $questiondifficult, EditQuestionDifficultRequest $request)
    {
        return new EditResponse($questiondifficult);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuestionDifficultRequestNamespace  $request
     * @param  App\Models\QuestionDifficults\QuestionDifficult  $questiondifficult
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuestionDifficultRequest $request, QuestionDifficult $questiondifficult)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $questiondifficult, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.questiondifficults.index'), ['flash_success' => _tr('alerts.backend.questiondifficults.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuestionDifficultRequestNamespace  $request
     * @param  App\Models\QuestionDifficults\QuestionDifficult  $questiondifficult
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuestionDifficult $questiondifficult, DeleteQuestionDifficultRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($questiondifficult);
        //returning with successfull message
        return new RedirectResponse(route('admin.questiondifficults.index'), ['flash_success' => _tr('alerts.backend.questiondifficults.deleted')]);
    }
    
}

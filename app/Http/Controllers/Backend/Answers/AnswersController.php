<?php

namespace App\Http\Controllers\Backend\Answers;

use App\Models\Answers\Answer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Answers\CreateResponse;
use App\Http\Responses\Backend\Answers\EditResponse;
use App\Repositories\Backend\Answers\AnswerRepository;
use App\Http\Requests\Backend\Answers\ManageAnswerRequest;
use App\Http\Requests\Backend\Answers\CreateAnswerRequest;
use App\Http\Requests\Backend\Answers\StoreAnswerRequest;
use App\Http\Requests\Backend\Answers\EditAnswerRequest;
use App\Http\Requests\Backend\Answers\UpdateAnswerRequest;
use App\Http\Requests\Backend\Answers\DeleteAnswerRequest;

/**
 * AnswersController
 */
class AnswersController extends Controller
{
    /**
     * variable to store the repository object
     * @var AnswerRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AnswerRepository $repository;
     */
    public function __construct(AnswerRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Answers\ManageAnswerRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAnswerRequest $request)
    {
        return new ViewResponse('backend.answers.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAnswerRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Answers\CreateResponse
     */
    public function create(CreateAnswerRequest $request)
    {
        return new CreateResponse('backend.answers.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAnswerRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAnswerRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.answers.index'), ['flash_success' => _tr('alerts.backend.answers.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Answers\Answer  $answer
     * @param  EditAnswerRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Answers\EditResponse
     */
    public function edit(Answer $answer, EditAnswerRequest $request)
    {
        return new EditResponse($answer);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAnswerRequestNamespace  $request
     * @param  App\Models\Answers\Answer  $answer
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAnswerRequest $request, Answer $answer)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $answer, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.answers.index'), ['flash_success' => _tr('alerts.backend.answers.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAnswerRequestNamespace  $request
     * @param  App\Models\Answers\Answer  $answer
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Answer $answer, DeleteAnswerRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($answer);
        //returning with successfull message
        return new RedirectResponse(route('admin.answers.index'), ['flash_success' => _tr('alerts.backend.answers.deleted')]);
    }
    
}

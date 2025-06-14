<?php

namespace App\Http\Controllers\Backend\CorrectAnswers;

use App\Models\CorrectAnswers\CorrectAnswer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\CorrectAnswers\CreateResponse;
use App\Http\Responses\Backend\CorrectAnswers\EditResponse;
use App\Repositories\Backend\CorrectAnswers\CorrectAnswerRepository;
use App\Http\Requests\Backend\CorrectAnswers\ManageCorrectAnswerRequest;
use App\Http\Requests\Backend\CorrectAnswers\CreateCorrectAnswerRequest;
use App\Http\Requests\Backend\CorrectAnswers\StoreCorrectAnswerRequest;
use App\Http\Requests\Backend\CorrectAnswers\EditCorrectAnswerRequest;
use App\Http\Requests\Backend\CorrectAnswers\UpdateCorrectAnswerRequest;
use App\Http\Requests\Backend\CorrectAnswers\DeleteCorrectAnswerRequest;

/**
 * CorrectAnswersController
 */
class CorrectAnswersController extends Controller
{
    /**
     * variable to store the repository object
     * @var CorrectAnswerRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param CorrectAnswerRepository $repository;
     */
    public function __construct(CorrectAnswerRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\CorrectAnswers\ManageCorrectAnswerRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageCorrectAnswerRequest $request)
    {
        return new ViewResponse('backend.correctanswers.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateCorrectAnswerRequestNamespace  $request
     * @return \App\Http\Responses\Backend\CorrectAnswers\CreateResponse
     */
    public function create(CreateCorrectAnswerRequest $request)
    {
        return new CreateResponse('backend.correctanswers.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCorrectAnswerRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreCorrectAnswerRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.correctanswers.index'), ['flash_success' => _tr('alerts.backend.correctanswers.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\CorrectAnswers\CorrectAnswer  $correctanswer
     * @param  EditCorrectAnswerRequestNamespace  $request
     * @return \App\Http\Responses\Backend\CorrectAnswers\EditResponse
     */
    public function edit(CorrectAnswer $correctanswer, EditCorrectAnswerRequest $request)
    {
        return new EditResponse($correctanswer);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateCorrectAnswerRequestNamespace  $request
     * @param  App\Models\CorrectAnswers\CorrectAnswer  $correctanswer
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateCorrectAnswerRequest $request, CorrectAnswer $correctanswer)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $correctanswer, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.correctanswers.index'), ['flash_success' => _tr('alerts.backend.correctanswers.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteCorrectAnswerRequestNamespace  $request
     * @param  App\Models\CorrectAnswers\CorrectAnswer  $correctanswer
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(CorrectAnswer $correctanswer, DeleteCorrectAnswerRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($correctanswer);
        //returning with successfull message
        return new RedirectResponse(route('admin.correctanswers.index'), ['flash_success' => _tr('alerts.backend.correctanswers.deleted')]);
    }
    
}

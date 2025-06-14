<?php

namespace App\Http\Controllers\Backend\QuizTypes;

use App\Models\QuizTypes\QuizType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizTypes\CreateResponse;
use App\Http\Responses\Backend\QuizTypes\EditResponse;
use App\Repositories\Backend\QuizTypes\QuizTypeRepository;
use App\Http\Requests\Backend\QuizTypes\ManageQuizTypeRequest;
use App\Http\Requests\Backend\QuizTypes\CreateQuizTypeRequest;
use App\Http\Requests\Backend\QuizTypes\StoreQuizTypeRequest;
use App\Http\Requests\Backend\QuizTypes\EditQuizTypeRequest;
use App\Http\Requests\Backend\QuizTypes\UpdateQuizTypeRequest;
use App\Http\Requests\Backend\QuizTypes\DeleteQuizTypeRequest;

/**
 * QuizTypesController
 */
class QuizTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizTypeRepository $repository;
     */
    public function __construct(QuizTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizTypes\ManageQuizTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizTypeRequest $request)
    {
        return new ViewResponse('backend.quiztypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizTypes\CreateResponse
     */
    public function create(CreateQuizTypeRequest $request)
    {
        return new CreateResponse('backend.quiztypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quiztypes.index'), ['flash_success' => _tr('alerts.backend.quiztypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizTypes\QuizType  $quiztype
     * @param  EditQuizTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizTypes\EditResponse
     */
    public function edit(QuizType $quiztype, EditQuizTypeRequest $request)
    {
        return new EditResponse($quiztype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizTypeRequestNamespace  $request
     * @param  App\Models\QuizTypes\QuizType  $quiztype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizTypeRequest $request, QuizType $quiztype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quiztype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quiztypes.index'), ['flash_success' => _tr('alerts.backend.quiztypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizTypeRequestNamespace  $request
     * @param  App\Models\QuizTypes\QuizType  $quiztype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizType $quiztype, DeleteQuizTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quiztype);
        //returning with successfull message
        return new RedirectResponse(route('admin.quiztypes.index'), ['flash_success' => _tr('alerts.backend.quiztypes.deleted')]);
    }
    
}

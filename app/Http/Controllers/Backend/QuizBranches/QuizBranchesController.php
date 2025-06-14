<?php

namespace App\Http\Controllers\Backend\QuizBranches;

use App\Models\QuizBranches\QuizBranche;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizBranches\CreateResponse;
use App\Http\Responses\Backend\QuizBranches\EditResponse;
use App\Repositories\Backend\QuizBranches\QuizBrancheRepository;
use App\Http\Requests\Backend\QuizBranches\ManageQuizBrancheRequest;
use App\Http\Requests\Backend\QuizBranches\CreateQuizBrancheRequest;
use App\Http\Requests\Backend\QuizBranches\StoreQuizBrancheRequest;
use App\Http\Requests\Backend\QuizBranches\EditQuizBrancheRequest;
use App\Http\Requests\Backend\QuizBranches\UpdateQuizBrancheRequest;
use App\Http\Requests\Backend\QuizBranches\DeleteQuizBrancheRequest;

/**
 * QuizBranchesController
 */
class QuizBranchesController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizBrancheRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizBrancheRepository $repository;
     */
    public function __construct(QuizBrancheRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizBranches\ManageQuizBrancheRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizBrancheRequest $request)
    {
        return new ViewResponse('backend.quizbranches.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizBrancheRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizBranches\CreateResponse
     */
    public function create(CreateQuizBrancheRequest $request)
    {
        return new CreateResponse('backend.quizbranches.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizBrancheRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizBrancheRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizbranches.index'), ['flash_success' => _tr('alerts.backend.quizbranches.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizBranches\QuizBranche  $quizbtanche
     * @param  EditQuizBrancheRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizBranches\EditResponse
     */
    public function edit(QuizBranche $quizbtanche, EditQuizBrancheRequest $request)
    {
        return new EditResponse($quizbtanche);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizBrancheRequestNamespace  $request
     * @param  App\Models\QuizBranches\QuizBranche  $quizbtanche
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizBrancheRequest $request, QuizBranche $quizbtanche)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quizbtanche, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizbranches.index'), ['flash_success' => _tr('alerts.backend.quizbranches.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizBrancheRequestNamespace  $request
     * @param  App\Models\QuizBranches\QuizBranche  $quizbtanche
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizBranche $quizbtanche, DeleteQuizBrancheRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quizbtanche);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizbranches.index'), ['flash_success' => _tr('alerts.backend.quizbranches.deleted')]);
    }
    
}

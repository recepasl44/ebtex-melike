<?php

namespace App\Http\Controllers\Backend\QuizTimes;

use App\Models\QuizTimes\QuizTime;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizTimes\CreateResponse;
use App\Http\Responses\Backend\QuizTimes\EditResponse;
use App\Repositories\Backend\QuizTimes\QuizTimeRepository;
use App\Http\Requests\Backend\QuizTimes\ManageQuizTimeRequest;
use App\Http\Requests\Backend\QuizTimes\CreateQuizTimeRequest;
use App\Http\Requests\Backend\QuizTimes\StoreQuizTimeRequest;
use App\Http\Requests\Backend\QuizTimes\EditQuizTimeRequest;
use App\Http\Requests\Backend\QuizTimes\UpdateQuizTimeRequest;
use App\Http\Requests\Backend\QuizTimes\DeleteQuizTimeRequest;

/**
 * QuizTimesController
 */
class QuizTimesController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizTimeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizTimeRepository $repository;
     */
    public function __construct(QuizTimeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizTimes\ManageQuizTimeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizTimeRequest $request)
    {
        return new ViewResponse('backend.quiztimes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizTimeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizTimes\CreateResponse
     */
    public function create(CreateQuizTimeRequest $request)
    {
        return new CreateResponse('backend.quiztimes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizTimeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizTimeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quiztimes.index'), ['flash_success' => _tr('alerts.backend.quiztimes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizTimes\QuizTime  $quiztime
     * @param  EditQuizTimeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizTimes\EditResponse
     */
    public function edit(QuizTime $quiztime, EditQuizTimeRequest $request)
    {
        return new EditResponse($quiztime);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizTimeRequestNamespace  $request
     * @param  App\Models\QuizTimes\QuizTime  $quiztime
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizTimeRequest $request, QuizTime $quiztime)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quiztime, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quiztimes.index'), ['flash_success' => _tr('alerts.backend.quiztimes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizTimeRequestNamespace  $request
     * @param  App\Models\QuizTimes\QuizTime  $quiztime
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizTime $quiztime, DeleteQuizTimeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quiztime);
        //returning with successfull message
        return new RedirectResponse(route('admin.quiztimes.index'), ['flash_success' => _tr('alerts.backend.quiztimes.deleted')]);
    }
    
}

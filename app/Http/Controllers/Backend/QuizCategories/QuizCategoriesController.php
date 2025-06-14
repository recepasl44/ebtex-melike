<?php

namespace App\Http\Controllers\Backend\QuizCategories;

use App\Models\QuizCategories\QuizCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuizCategories\CreateResponse;
use App\Http\Responses\Backend\QuizCategories\EditResponse;
use App\Repositories\Backend\QuizCategories\QuizCategoryRepository;
use App\Http\Requests\Backend\QuizCategories\ManageQuizCategoryRequest;
use App\Http\Requests\Backend\QuizCategories\CreateQuizCategoryRequest;
use App\Http\Requests\Backend\QuizCategories\StoreQuizCategoryRequest;
use App\Http\Requests\Backend\QuizCategories\EditQuizCategoryRequest;
use App\Http\Requests\Backend\QuizCategories\UpdateQuizCategoryRequest;
use App\Http\Requests\Backend\QuizCategories\DeleteQuizCategoryRequest;

/**
 * QuizCategoriesController
 */
class QuizCategoriesController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuizCategoryRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizCategoryRepository $repository;
     */
    public function __construct(QuizCategoryRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuizCategories\ManageQuizCategoryRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuizCategoryRequest $request)
    {
        return new ViewResponse('backend.quizcategories.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuizCategoryRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizCategories\CreateResponse
     */
    public function create(CreateQuizCategoryRequest $request)
    {
        return new CreateResponse('backend.quizcategories.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuizCategoryRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuizCategoryRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.quizcategories.index'), ['flash_success' => _tr('alerts.backend.quizcategories.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuizCategories\QuizCategory  $quizcategory
     * @param  EditQuizCategoryRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuizCategories\EditResponse
     */
    public function edit(QuizCategory $quizcategory, EditQuizCategoryRequest $request)
    {
        return new EditResponse($quizcategory);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuizCategoryRequestNamespace  $request
     * @param  App\Models\QuizCategories\QuizCategory  $quizcategory
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuizCategoryRequest $request, QuizCategory $quizcategory)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $quizcategory, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.quizcategories.index'), ['flash_success' => _tr('alerts.backend.quizcategories.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuizCategoryRequestNamespace  $request
     * @param  App\Models\QuizCategories\QuizCategory  $quizcategory
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuizCategory $quizcategory, DeleteQuizCategoryRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($quizcategory);
        //returning with successfull message
        return new RedirectResponse(route('admin.quizcategories.index'), ['flash_success' => _tr('alerts.backend.quizcategories.deleted')]);
    }
    
}

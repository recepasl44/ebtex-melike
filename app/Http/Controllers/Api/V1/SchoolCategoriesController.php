<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\SchoolCategoryResource;
use App\Models\SchoolCategories\SchoolCategory;
use App\Repositories\Backend\SchoolCategories\SchoolCategoryRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * SchoolCategoriesController
 */
class SchoolCategoriesController extends APIController
{
    /**
     * __construct.
     *
     * @var SchoolCategoryRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SchoolCategoryRepository $repository;
     */
    public function __construct(SchoolCategoryRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $schoolcategory.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return SchoolCategoryResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param SchoolCategory $schoolcategory
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(SchoolCategory $schoolcategory)
    {
        return new SchoolCategoryResource($schoolcategory);
    }

    
     /**
      * Creates the Resource for schoolcategory.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateSchoolCategory($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new SchoolCategoryResource(SchoolCategory::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update schoolcategory.
         *
         * @param SchoolCategory    $schoolcategory
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, SchoolCategory $schoolcategory)
    {
        $validation = $this->validateSchoolCategory($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($schoolcategory, $request->all());

        $schoolcategory = SchoolCategory::findOrfail($schoolcategory->id);

        return new SchoolCategoryResource($schoolcategory);
    }
    
    /**
     * Delete schoolcategory.
     *
     * @param SchoolCategory    $schoolcategory
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(SchoolCategory $schoolcategory)
    {
        $this->repository->delete($schoolcategory);

        return $this->respond([
            'message' => _tr('alerts.backend.schoolcategory.deleted'),
        ]);
    }
    

    /**
     * validate schoolcategory.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateSchoolCategory(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate schoolcategory.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

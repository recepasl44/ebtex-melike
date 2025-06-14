<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\DiscountStudentResource;
use App\Models\DiscountStudents\DiscountStudent;
use App\Repositories\Backend\DiscountStudents\DiscountStudentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * DiscountStudentsController
 */
class DiscountStudentsController extends APIController
{
    /**
     * __construct.
     *
     * @var DiscountStudentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param DiscountStudentRepository $repository;
     */
    public function __construct(DiscountStudentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $discountstudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return DiscountStudentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param DiscountStudent $discountstudent
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(DiscountStudent $discountstudent)
    {
        return new DiscountStudentResource($discountstudent);
    }

    
     /**
      * Creates the Resource for discountstudent.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateDiscountStudent($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new DiscountStudentResource(DiscountStudent::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update discountstudent.
         *
         * @param DiscountStudent    $discountstudent
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, DiscountStudent $discountstudent)
    {
        $validation = $this->validateDiscountStudent($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($discountstudent, $request->all());

        $discountstudent = DiscountStudent::findOrfail($discountstudent->id);

        return new DiscountStudentResource($discountstudent);
    }
    
    /**
     * Delete discountstudent.
     *
     * @param DiscountStudent    $discountstudent
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(DiscountStudent $discountstudent)
    {
        $this->repository->delete($discountstudent);

        return $this->respond([
            'message' => _tr('alerts.backend.discountstudent.deleted'),
        ]);
    }
    

    /**
     * validate discountstudent.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateDiscountStudent(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'discount_id' => 'required',
               'student_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate discountstudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

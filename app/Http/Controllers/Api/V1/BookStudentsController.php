<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\BookStudentResource;
use App\Models\BookStudents\BookStudent;
use App\Repositories\Backend\BookStudents\BookStudentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * BookStudentsController
 */
class BookStudentsController extends APIController
{
    /**
     * __construct.
     *
     * @var BookStudentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookStudentRepository $repository;
     */
    public function __construct(BookStudentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $bookstudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return BookStudentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param BookStudent $bookstudent
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(BookStudent $bookstudent)
    {
        return new BookStudentResource($bookstudent);
    }

    
     /**
      * Creates the Resource for bookstudent.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateBookStudent($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new BookStudentResource(BookStudent::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update bookstudent.
         *
         * @param BookStudent    $bookstudent
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, BookStudent $bookstudent)
    {
        $validation = $this->validateBookStudent($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($bookstudent, $request->all());

        $bookstudent = BookStudent::findOrfail($bookstudent->id);

        return new BookStudentResource($bookstudent);
    }
    
    /**
     * Delete bookstudent.
     *
     * @param BookStudent    $bookstudent
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(BookStudent $bookstudent)
    {
        $this->repository->delete($bookstudent);

        return $this->respond([
            'message' => _tr('alerts.backend.bookstudent.deleted'),
        ]);
    }
    

    /**
     * validate bookstudent.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateBookStudent(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'book_id' => 'required',
               'student_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate bookstudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

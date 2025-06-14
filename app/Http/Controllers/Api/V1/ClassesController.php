<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ClassResource;
use App\Models\Classes\Class;
use App\Repositories\Backend\Classes\ClassRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ClassesController
 */
class ClassesController extends APIController
{
    /**
     * __construct.
     *
     * @var ClassRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ClassRepository $repository;
     */
    public function __construct(ClassRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $class.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ClassResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Class $class
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Class $class)
    {
        return new ClassResource($class);
    }

    
     /**
      * Creates the Resource for class.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateClass($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ClassResource(Class::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update class.
         *
         * @param Class    $class
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Class $class)
    {
        $validation = $this->validateClass($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($class, $request->all());

        $class = Class::findOrfail($class->id);

        return new ClassResource($class);
    }
    
    /**
     * Delete class.
     *
     * @param Class    $class
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Class $class)
    {
        $this->repository->delete($class);

        return $this->respond([
            'message' => _tr('alerts.backend.class.deleted'),
        ]);
    }
    

    /**
     * validate class.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateClass(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'branch' => 'max:191',
               'name' => 'required|max:191',
               'level' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate class.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

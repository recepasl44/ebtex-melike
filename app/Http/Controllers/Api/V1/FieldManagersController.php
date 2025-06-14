<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\FieldManagerResource;
use App\Models\FieldManagers\FieldManager;
use App\Repositories\Backend\FieldManagers\FieldManagerRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * FieldManagersController
 */
class FieldManagersController extends APIController
{
    /**
     * __construct.
     *
     * @var FieldManagerRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param FieldManagerRepository $repository;
     */
    public function __construct(FieldManagerRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return the $fieldmanager.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return FieldManagerResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param FieldManager $fieldmanager
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(FieldManager $fieldmanager)
    {
        return new FieldManagerResource($fieldmanager);
    }

    
     /**
      * Creates the Resource for fieldmanager.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateFieldManager($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new FieldManagerResource(FieldManager::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update fieldmanager.
         *
         * @param FieldManager    $fieldmanager
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, FieldManager $fieldmanager)
    {
        $validation = $this->validateFieldManager($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($fieldmanager, $request->all());

        $fieldmanager = FieldManager::findOrfail($fieldmanager->id);

        return new FieldManagerResource($fieldmanager);
    }
    
    /**
     * Delete fieldmanager.
     *
     * @param FieldManager    $fieldmanager
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(FieldManager $fieldmanager)
    {
        $this->repository->delete($fieldmanager);

        return $this->respond([
            'message' => _tr('alerts.backend.fieldmanager.deleted'),
        ]);
    }
    

    /**
     * validate fieldmanager.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateFieldManager(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
            'method' => 'max:191',
        ]);

        return $validation;
    }

    /**
     * validate message for validate fieldmanager.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

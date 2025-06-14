<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\OpticalAttributeResource;
use App\Models\OpticalAttributes\OpticalAttribute;
use App\Repositories\Backend\OpticalAttributes\OpticalAttributeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * OpticalAttributesController
 */
class OpticalAttributesController extends APIController
{
    /**
     * __construct.
     *
     * @var OpticalAttributeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param OpticalAttributeRepository $repository;
     */
    public function __construct(OpticalAttributeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $opticalattribute.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return OpticalAttributeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param OpticalAttribute $opticalattribute
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(OpticalAttribute $opticalattribute)
    {
        return new OpticalAttributeResource($opticalattribute);
    }

    
     /**
      * Creates the Resource for opticalattribute.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateOpticalAttribute($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new OpticalAttributeResource(OpticalAttribute::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update opticalattribute.
         *
         * @param OpticalAttribute    $opticalattribute
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, OpticalAttribute $opticalattribute)
    {
        $validation = $this->validateOpticalAttribute($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($opticalattribute, $request->all());

        $opticalattribute = OpticalAttribute::findOrfail($opticalattribute->id);

        return new OpticalAttributeResource($opticalattribute);
    }
    
    /**
     * Delete opticalattribute.
     *
     * @param OpticalAttribute    $opticalattribute
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(OpticalAttribute $opticalattribute)
    {
        $this->repository->delete($opticalattribute);

        return $this->respond([
            'message' => _tr('alerts.backend.opticalattribute.deleted'),
        ]);
    }
    

    /**
     * validate opticalattribute.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateOpticalAttribute(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'form_id' => 'required',
               'columns' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate opticalattribute.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

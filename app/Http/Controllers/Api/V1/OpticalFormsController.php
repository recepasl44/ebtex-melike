<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\OpticalFormResource;
use App\Models\OpticalForms\OpticalForm;
use App\Repositories\Backend\OpticalForms\OpticalFormRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * OpticalFormsController
 */
class OpticalFormsController extends APIController
{
    /**
     * __construct.
     *
     * @var OpticalFormRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param OpticalFormRepository $repository;
     */
    public function __construct(OpticalFormRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $opticalform.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return OpticalFormResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param OpticalForm $opticalform
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(OpticalForm $opticalform)
    {
        return new OpticalFormResource($opticalform);
    }

    
     /**
      * Creates the Resource for opticalform.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateOpticalForm($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new OpticalFormResource(OpticalForm::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update opticalform.
         *
         * @param OpticalForm    $opticalform
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, OpticalForm $opticalform)
    {
        $validation = $this->validateOpticalForm($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($opticalform, $request->all());

        $opticalform = OpticalForm::findOrfail($opticalform->id);

        return new OpticalFormResource($opticalform);
    }
    
    /**
     * Delete opticalform.
     *
     * @param OpticalForm    $opticalform
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(OpticalForm $opticalform)
    {
        $this->repository->delete($opticalform);

        return $this->respond([
            'message' => _tr('alerts.backend.opticalform.deleted'),
        ]);
    }
    

    /**
     * validate opticalform.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateOpticalForm(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate opticalform.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

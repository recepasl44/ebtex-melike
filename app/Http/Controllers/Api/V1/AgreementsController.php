<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AgreementResource;
use App\Models\Agreements\Agreement;
use App\Repositories\Backend\Agreements\AgreementRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AgreementsController
 */
class AgreementsController extends APIController
{
    /**
     * __construct.
     *
     * @var AgreementRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AgreementRepository $repository;
     */
    public function __construct(AgreementRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $agreement.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AgreementResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Agreement $agreement
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Agreement $agreement)
    {
        return new AgreementResource($agreement);
    }

    
     /**
      * Creates the Resource for agreement.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAgreement($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AgreementResource(Agreement::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update agreement.
         *
         * @param Agreement    $agreement
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Agreement $agreement)
    {
        $validation = $this->validateAgreement($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($agreement, $request->all());

        $agreement = Agreement::findOrfail($agreement->id);

        return new AgreementResource($agreement);
    }
    
    /**
     * Delete agreement.
     *
     * @param Agreement    $agreement
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Agreement $agreement)
    {
        $this->repository->delete($agreement);

        return $this->respond([
            'message' => _tr('alerts.backend.agreement.deleted'),
        ]);
    }
    

    /**
     * validate agreement.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAgreement(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'max:191',
               'path' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate agreement.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

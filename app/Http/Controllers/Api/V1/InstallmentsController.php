<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\InstallmentResource;
use App\Models\Installments\Installment;
use App\Repositories\Backend\Installments\InstallmentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * InstallmentsController
 */
class InstallmentsController extends APIController
{
    /**
     * __construct.
     *
     * @var InstallmentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param InstallmentRepository $repository;
     */
    public function __construct(InstallmentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $installment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return InstallmentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Installment $installment
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Installment $installment)
    {
        return new InstallmentResource($installment);
    }


    /**
     * Creates the Resource for installment.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateInstallment($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new InstallmentResource(Installment::orderBy('created_at', 'desc')->first());

    }
    /**
     * Update installment.
     *
     * @param Installment    $installment
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Installment $installment)
    {
        $validation = $this->validateInstallment($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($installment, $request->all());

        $installment = Installment::findOrfail($installment->id);

        return new InstallmentResource($installment);
    }

    /**
     * Delete installment.
     *
     * @param Installment    $installment
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Installment $installment)
    {
        $this->repository->delete($installment);

        return $this->respond([
            'message' => _tr('alerts.backend.installment.deleted'),
        ]);
    }


    /**
     * validate installment.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateInstallment(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
            'enrollment_id' => 'required',
            'amount' => 'required',
            'due_date' => 'required',
            'payment_date' => 'required',
        ]);

        return $validation;
    }

    /**
     * validate message for validate installment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

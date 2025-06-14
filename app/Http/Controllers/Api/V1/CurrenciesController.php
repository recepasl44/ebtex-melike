<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\CurrencyResource;
use App\Models\Currencies\Currency;
use App\Repositories\Backend\Currencies\CurrencyRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * CurrenciesController
 */
class CurrenciesController extends APIController
{
    /**
     * __construct.
     *
     * @var CurrencyRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param CurrencyRepository $repository;
     */
    public function __construct(CurrencyRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $currency.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return CurrencyResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Currency $currency
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Currency $currency)
    {
        return new CurrencyResource($currency);
    }

    
     /**
      * Creates the Resource for currency.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateCurrency($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new CurrencyResource(Currency::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update currency.
         *
         * @param Currency    $currency
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Currency $currency)
    {
        $validation = $this->validateCurrency($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($currency, $request->all());

        $currency = Currency::findOrfail($currency->id);

        return new CurrencyResource($currency);
    }
    
    /**
     * Delete currency.
     *
     * @param Currency    $currency
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Currency $currency)
    {
        $this->repository->delete($currency);

        return $this->respond([
            'message' => _tr('alerts.backend.currency.deleted'),
        ]);
    }
    

    /**
     * validate currency.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateCurrency(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'code' => 'required|max:191',
               'symbol' => 'max:191',
               'exchange_rate' => 'decimal:2',
               ]);

        return $validation;
    }

    /**
     * validate message for validate currency.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

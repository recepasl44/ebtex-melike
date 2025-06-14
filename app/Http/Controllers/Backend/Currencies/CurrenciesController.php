<?php

namespace App\Http\Controllers\Backend\Currencies;

use App\Models\Currencies\Currency;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Currencies\CreateResponse;
use App\Http\Responses\Backend\Currencies\EditResponse;
use App\Repositories\Backend\Currencies\CurrencyRepository;
use App\Http\Requests\Backend\Currencies\ManageCurrencyRequest;
use App\Http\Requests\Backend\Currencies\CreateCurrencyRequest;
use App\Http\Requests\Backend\Currencies\StoreCurrencyRequest;
use App\Http\Requests\Backend\Currencies\EditCurrencyRequest;
use App\Http\Requests\Backend\Currencies\UpdateCurrencyRequest;
use App\Http\Requests\Backend\Currencies\DeleteCurrencyRequest;

/**
 * CurrenciesController
 */
class CurrenciesController extends Controller
{
    /**
     * variable to store the repository object
     * @var CurrencyRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Currencies\ManageCurrencyRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageCurrencyRequest $request)
    {
        return new ViewResponse('backend.currencies.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateCurrencyRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Currencies\CreateResponse
     */
    public function create(CreateCurrencyRequest $request)
    {
        return new CreateResponse('backend.currencies.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCurrencyRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreCurrencyRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.currencies.index'), ['flash_success' => _tr('alerts.backend.currencies.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Currencies\Currency  $currency
     * @param  EditCurrencyRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Currencies\EditResponse
     */
    public function edit(Currency $currency, EditCurrencyRequest $request)
    {
        return new EditResponse($currency);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateCurrencyRequestNamespace  $request
     * @param  App\Models\Currencies\Currency  $currency
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateCurrencyRequest $request, Currency $currency)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $currency, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.currencies.index'), ['flash_success' => _tr('alerts.backend.currencies.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteCurrencyRequestNamespace  $request
     * @param  App\Models\Currencies\Currency  $currency
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Currency $currency, DeleteCurrencyRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($currency);
        //returning with successfull message
        return new RedirectResponse(route('admin.currencies.index'), ['flash_success' => _tr('alerts.backend.currencies.deleted')]);
    }
    
}

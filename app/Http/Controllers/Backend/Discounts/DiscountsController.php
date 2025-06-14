<?php

namespace App\Http\Controllers\Backend\Discounts;

use App\Models\Discounts\Discount;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Discounts\CreateResponse;
use App\Http\Responses\Backend\Discounts\EditResponse;
use App\Repositories\Backend\Discounts\DiscountRepository;
use App\Http\Requests\Backend\Discounts\ManageDiscountRequest;
use App\Http\Requests\Backend\Discounts\CreateDiscountRequest;
use App\Http\Requests\Backend\Discounts\StoreDiscountRequest;
use App\Http\Requests\Backend\Discounts\EditDiscountRequest;
use App\Http\Requests\Backend\Discounts\UpdateDiscountRequest;
use App\Http\Requests\Backend\Discounts\DeleteDiscountRequest;

/**
 * DiscountsController
 */
class DiscountsController extends Controller
{
    /**
     * variable to store the repository object
     * @var DiscountRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param DiscountRepository $repository;
     */
    public function __construct(DiscountRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Discounts\ManageDiscountRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageDiscountRequest $request)
    {
        return new ViewResponse('backend.discounts.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateDiscountRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Discounts\CreateResponse
     */
    public function create(CreateDiscountRequest $request)
    {
        return new CreateResponse('backend.discounts.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreDiscountRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreDiscountRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.discounts.index'), ['flash_success' => _tr('alerts.backend.discounts.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Discounts\Discount  $discount
     * @param  EditDiscountRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Discounts\EditResponse
     */
    public function edit(Discount $discount, EditDiscountRequest $request)
    {
        return new EditResponse($discount);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateDiscountRequestNamespace  $request
     * @param  App\Models\Discounts\Discount  $discount
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateDiscountRequest $request, Discount $discount)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $discount, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.discounts.index'), ['flash_success' => _tr('alerts.backend.discounts.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteDiscountRequestNamespace  $request
     * @param  App\Models\Discounts\Discount  $discount
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Discount $discount, DeleteDiscountRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($discount);
        //returning with successfull message
        return new RedirectResponse(route('admin.discounts.index'), ['flash_success' => _tr('alerts.backend.discounts.deleted')]);
    }
    
}

<?php

namespace App\Http\Controllers\Backend\UserDiscounts;

use App\Models\UserDiscounts\UserDiscount;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\UserDiscounts\CreateResponse;
use App\Http\Responses\Backend\UserDiscounts\EditResponse;
use App\Repositories\Backend\UserDiscounts\UserDiscountRepository;
use App\Http\Requests\Backend\UserDiscounts\ManageUserDiscountRequest;
use App\Http\Requests\Backend\UserDiscounts\CreateUserDiscountRequest;
use App\Http\Requests\Backend\UserDiscounts\StoreUserDiscountRequest;
use App\Http\Requests\Backend\UserDiscounts\EditUserDiscountRequest;
use App\Http\Requests\Backend\UserDiscounts\UpdateUserDiscountRequest;
use App\Http\Requests\Backend\UserDiscounts\DeleteUserDiscountRequest;

/**
 * UserDiscountsController
 */
class UserDiscountsController extends Controller
{
    /**
     * variable to store the repository object
     * @var UserDiscountRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param UserDiscountRepository $repository;
     */
    public function __construct(UserDiscountRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\UserDiscounts\ManageUserDiscountRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageUserDiscountRequest $request)
    {
        return new ViewResponse('backend.userdiscounts.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateUserDiscountRequestNamespace  $request
     * @return \App\Http\Responses\Backend\UserDiscounts\CreateResponse
     */
    public function create(CreateUserDiscountRequest $request)
    {
        return new CreateResponse('backend.userdiscounts.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreUserDiscountRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreUserDiscountRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.userdiscounts.index'), ['flash_success' => _tr('alerts.backend.userdiscounts.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\UserDiscounts\UserDiscount  $userdiscount
     * @param  EditUserDiscountRequestNamespace  $request
     * @return \App\Http\Responses\Backend\UserDiscounts\EditResponse
     */
    public function edit(UserDiscount $userdiscount, EditUserDiscountRequest $request)
    {
        return new EditResponse($userdiscount);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateUserDiscountRequestNamespace  $request
     * @param  App\Models\UserDiscounts\UserDiscount  $userdiscount
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateUserDiscountRequest $request, UserDiscount $userdiscount)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $userdiscount, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.userdiscounts.index'), ['flash_success' => _tr('alerts.backend.userdiscounts.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteUserDiscountRequestNamespace  $request
     * @param  App\Models\UserDiscounts\UserDiscount  $userdiscount
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(UserDiscount $userdiscount, DeleteUserDiscountRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($userdiscount);
        //returning with successfull message
        return new RedirectResponse(route('admin.userdiscounts.index'), ['flash_success' => _tr('alerts.backend.userdiscounts.deleted')]);
    }
    
}

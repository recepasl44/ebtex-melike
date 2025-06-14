<?php

namespace App\Http\Controllers\Backend\Addresses;

use App\Models\Addresses\Address;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Addresses\CreateResponse;
use App\Http\Responses\Backend\Addresses\EditResponse;
use App\Repositories\Backend\Addresses\AddressRepository;
use App\Http\Requests\Backend\Addresses\ManageAddressRequest;
use App\Http\Requests\Backend\Addresses\CreateAddressRequest;
use App\Http\Requests\Backend\Addresses\StoreAddressRequest;
use App\Http\Requests\Backend\Addresses\EditAddressRequest;
use App\Http\Requests\Backend\Addresses\UpdateAddressRequest;
use App\Http\Requests\Backend\Addresses\DeleteAddressRequest;

/**
 * AddressesController
 */
class AddressesController extends Controller
{
    /**
     * variable to store the repository object
     * @var AddressRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AddressRepository $repository;
     */
    public function __construct(AddressRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Addresses\ManageAddressRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAddressRequest $request)
    {
        return new ViewResponse('backend.addresses.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAddressRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Addresses\CreateResponse
     */
    public function create(CreateAddressRequest $request)
    {
        return new CreateResponse('backend.addresses.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAddressRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAddressRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.addresses.index'), ['flash_success' => _tr('alerts.backend.addresses.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Addresses\Address  $address
     * @param  EditAddressRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Addresses\EditResponse
     */
    public function edit(Address $address, EditAddressRequest $request)
    {
        return new EditResponse($address);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAddressRequestNamespace  $request
     * @param  App\Models\Addresses\Address  $address
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAddressRequest $request, Address $address)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $address, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.addresses.index'), ['flash_success' => _tr('alerts.backend.addresses.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAddressRequestNamespace  $request
     * @param  App\Models\Addresses\Address  $address
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Address $address, DeleteAddressRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($address);
        //returning with successfull message
        return new RedirectResponse(route('admin.addresses.index'), ['flash_success' => _tr('alerts.backend.addresses.deleted')]);
    }
    
}

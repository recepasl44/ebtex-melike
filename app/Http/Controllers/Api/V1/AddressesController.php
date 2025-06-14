<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AddressResource;
use App\Models\Addresses\Address;
use App\Repositories\Backend\Addresses\AddressRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AddressesController
 */
class AddressesController extends APIController
{
    /**
     * __construct.
     *
     * @var AddressRepository
     * @param $repository
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
     * Return the $address.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AddressResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Address $address
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Address $address)
    {
        return new AddressResource($address);
    }

    
     /**
      * Creates the Resource for address.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAddress($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AddressResource(Address::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update address.
         *
         * @param Address    $address
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Address $address)
    {
        $validation = $this->validateAddress($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($address, $request->all());

        $address = Address::findOrfail($address->id);

        return new AddressResource($address);
    }
    
    /**
     * Delete address.
     *
     * @param Address    $address
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Address $address)
    {
        $this->repository->delete($address);

        return $this->respond([
            'message' => _tr('alerts.backend.address.deleted'),
        ]);
    }
    

    /**
     * validate address.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAddress(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'addressable_id' => 'required',
               'addressable_type' => 'required|max:191',
               'country_id' => 'required',
               'city_id' => 'required',
               'county_id' => 'required',
               'address' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate address.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

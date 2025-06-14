<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\SmsProviderResource;
use App\Models\SmsProviders\SmsProvider;
use App\Repositories\Backend\SmsProviders\SmsProviderRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * SmsProvidersController
 */
class SmsProvidersController extends APIController
{
    /**
     * __construct.
     *
     * @var SmsProviderRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SmsProviderRepository $repository;
     */
    public function __construct(SmsProviderRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $smsprovider.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return SmsProviderResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param SmsProvider $smsprovider
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(SmsProvider $smsprovider)
    {
        return new SmsProviderResource($smsprovider);
    }

    
     /**
      * Creates the Resource for smsprovider.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateSmsProvider($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new SmsProviderResource(SmsProvider::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update smsprovider.
         *
         * @param SmsProvider    $smsprovider
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, SmsProvider $smsprovider)
    {
        $validation = $this->validateSmsProvider($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($smsprovider, $request->all());

        $smsprovider = SmsProvider::findOrfail($smsprovider->id);

        return new SmsProviderResource($smsprovider);
    }
    
    /**
     * Delete smsprovider.
     *
     * @param SmsProvider    $smsprovider
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(SmsProvider $smsprovider)
    {
        $this->repository->delete($smsprovider);

        return $this->respond([
            'message' => _tr('alerts.backend.smsprovider.deleted'),
        ]);
    }
    

    /**
     * validate smsprovider.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateSmsProvider(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'user_id' => 'required',
               'provider' => 'required|max:191',
               'username' => 'max:191',
               'password' => 'max:191',
               'api_key' => 'max:191',
               'api_secret' => 'max:191',
               'origin' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate smsprovider.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

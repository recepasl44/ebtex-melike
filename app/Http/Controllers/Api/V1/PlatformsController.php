<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\PlatformResource;
use App\Platform\Platform;
use App\Repositories\Backend\Platforms\PlatformRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * PlatformsController
 */
class PlatformsController extends APIController
{
    /**
     * __construct.
     *
     * @var PlatformRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PlatformRepository $repository;
     */
    public function __construct(PlatformRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $platform.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $platform = $this->repository->getForDataTable()->where('id', Platform::id())->first();
        return new PlatformResource($platform);
    }
    /**
     * Return the specified resource.
     *
     * @param Platform $platform
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Platform $platform)
    {
        return new PlatformResource($platform);
    }

    
     /**
      * Creates the Resource for platform.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validatePlatform($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new PlatformResource(Platform::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update platform.
         *
         * @param Platform    $platform
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Platform $platform)
    {
        $validation = $this->validatePlatform($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($platform, $request->all());

        $platform = Platform::findOrfail($platform->id);

        return new PlatformResource($platform);
    }
    
    /**
     * Delete platform.
     *
     * @param Platform    $platform
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Platform $platform)
    {
        $this->repository->delete($platform);

        return $this->respond([
            'message' => _tr('alerts.backend.platform.deleted'),
        ]);
    }
    

    /**
     * validate platform.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validatePlatform(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'owner_name' => 'required|max:191',
               'phone' => 'max:191',
               'gsm' => 'max:191',
               'status' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate platform.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ScholarshipSettingResource;
use App\Models\ScholarshipSettings\ScholarshipSetting;
use App\Repositories\Backend\ScholarshipSettings\ScholarshipSettingRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ScholarshipSettingsController
 */
class ScholarshipSettingsController extends APIController
{
    /**
     * __construct.
     *
     * @var ScholarshipSettingRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ScholarshipSettingRepository $repository;
     */
    public function __construct(ScholarshipSettingRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $scholarshipsetting.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ScholarshipSettingResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ScholarshipSetting $scholarshipsetting
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ScholarshipSetting $scholarshipsetting)
    {
        return new ScholarshipSettingResource($scholarshipsetting);
    }

    
     /**
      * Creates the Resource for scholarshipsetting.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateScholarshipSetting($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ScholarshipSettingResource(ScholarshipSetting::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update scholarshipsetting.
         *
         * @param ScholarshipSetting    $scholarshipsetting
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ScholarshipSetting $scholarshipsetting)
    {
        $validation = $this->validateScholarshipSetting($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($scholarshipsetting, $request->all());

        $scholarshipsetting = ScholarshipSetting::findOrfail($scholarshipsetting->id);

        return new ScholarshipSettingResource($scholarshipsetting);
    }
    
    /**
     * Delete scholarshipsetting.
     *
     * @param ScholarshipSetting    $scholarshipsetting
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ScholarshipSetting $scholarshipsetting)
    {
        $this->repository->delete($scholarshipsetting);

        return $this->respond([
            'message' => _tr('alerts.backend.scholarshipsetting.deleted'),
        ]);
    }
    

    /**
     * validate scholarshipsetting.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateScholarshipSetting(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               ]);

        return $validation;
    }

    /**
     * validate message for validate scholarshipsetting.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

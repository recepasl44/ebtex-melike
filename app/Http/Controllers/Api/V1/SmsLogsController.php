<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\SmsLogResource;
use App\Models\SmsLogs\SmsLog;
use App\Repositories\Backend\SmsLogs\SmsLogRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * SmsLogsController
 */
class SmsLogsController extends APIController
{
    /**
     * __construct.
     *
     * @var SmsLogRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SmsLogRepository $repository;
     */
    public function __construct(SmsLogRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $smslog.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return SmsLogResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param SmsLog $smslog
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(SmsLog $smslog)
    {
        return new SmsLogResource($smslog);
    }

    
     /**
      * Creates the Resource for smslog.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateSmsLog($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new SmsLogResource(SmsLog::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update smslog.
         *
         * @param SmsLog    $smslog
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, SmsLog $smslog)
    {
        $validation = $this->validateSmsLog($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($smslog, $request->all());

        $smslog = SmsLog::findOrfail($smslog->id);

        return new SmsLogResource($smslog);
    }
    
    /**
     * Delete smslog.
     *
     * @param SmsLog    $smslog
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(SmsLog $smslog)
    {
        $this->repository->delete($smslog);

        return $this->respond([
            'message' => _tr('alerts.backend.smslog.deleted'),
        ]);
    }
    

    /**
     * validate smslog.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateSmsLog(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'user_id' => 'required',
               'provider' => 'required|max:191',
               'phone' => 'required|max:191',
               'message' => 'required|max:191',
               'provider' => 'required|max:191',
               'status' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate smslog.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

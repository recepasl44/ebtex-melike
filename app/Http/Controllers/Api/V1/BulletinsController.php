<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\BulletinResource;
use App\Models\Bulletins\Bulletin;
use App\Repositories\Backend\Bulletins\BulletinRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * BulletinsController
 */
class BulletinsController extends APIController
{
    /**
     * __construct.
     *
     * @var BulletinRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BulletinRepository $repository;
     */
    public function __construct(BulletinRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $bulletin.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return BulletinResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Bulletin $bulletin
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Bulletin $bulletin)
    {
        return new BulletinResource($bulletin);
    }

    
     /**
      * Creates the Resource for bulletin.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateBulletin($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new BulletinResource(Bulletin::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update bulletin.
         *
         * @param Bulletin    $bulletin
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Bulletin $bulletin)
    {
        $validation = $this->validateBulletin($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($bulletin, $request->all());

        $bulletin = Bulletin::findOrfail($bulletin->id);

        return new BulletinResource($bulletin);
    }
    
    /**
     * Delete bulletin.
     *
     * @param Bulletin    $bulletin
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Bulletin $bulletin)
    {
        $this->repository->delete($bulletin);

        return $this->respond([
            'message' => _tr('alerts.backend.bulletin.deleted'),
        ]);
    }
    

    /**
     * validate bulletin.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateBulletin(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'title' => 'required|max:191',
               'content' => 'required|max:191',
               'start_date' => 'date',
               'end_date' => 'date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate bulletin.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

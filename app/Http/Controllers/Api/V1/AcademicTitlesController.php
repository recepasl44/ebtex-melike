<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AcademicTitleResource;
use App\Models\AcademicTitles\AcademicTitle;
use App\Repositories\Backend\AcademicTitles\AcademicTitleRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AcademicTitlesController
 */
class AcademicTitlesController extends APIController
{
    /**
     * __construct.
     *
     * @var AcademicTitleRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AcademicTitleRepository $repository;
     */
    public function __construct(AcademicTitleRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return the $academictitle.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AcademicTitleResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param AcademicTitle $academictitle
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(AcademicTitle $academictitle)
    {
        return new AcademicTitleResource($academictitle);
    }

    
     /**
      * Creates the Resource for academictitle.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAcademicTitle($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AcademicTitleResource(AcademicTitle::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update academictitle.
         *
         * @param AcademicTitle    $academictitle
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, AcademicTitle $academictitle)
    {
        $validation = $this->validateAcademicTitle($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($academictitle, $request->all());

        $academictitle = AcademicTitle::findOrfail($academictitle->id);

        return new AcademicTitleResource($academictitle);
    }
    
    /**
     * Delete academictitle.
     *
     * @param AcademicTitle    $academictitle
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(AcademicTitle $academictitle)
    {
        $this->repository->delete($academictitle);

        return $this->respond([
            'message' => _tr('alerts.backend.academictitle.deleted'),
        ]);
    }
    

    /**
     * validate academictitle.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAcademicTitle(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate academictitle.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

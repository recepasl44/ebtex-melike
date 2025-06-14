<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ChapterResource;
use App\Models\Chapters\Chapter;
use App\Repositories\Backend\Chapters\ChapterRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ChaptersController
 */
class ChaptersController extends APIController
{
    /**
     * __construct.
     *
     * @var ChapterRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ChapterRepository $repository;
     */
    public function __construct(ChapterRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $chapter.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ChapterResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Chapter $chapter
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Chapter $chapter)
    {
        return new ChapterResource($chapter);
    }

    
     /**
      * Creates the Resource for chapter.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateChapter($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ChapterResource(Chapter::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update chapter.
         *
         * @param Chapter    $chapter
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Chapter $chapter)
    {
        $validation = $this->validateChapter($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($chapter, $request->all());

        $chapter = Chapter::findOrfail($chapter->id);

        return new ChapterResource($chapter);
    }
    
    /**
     * Delete chapter.
     *
     * @param Chapter    $chapter
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Chapter $chapter)
    {
        $this->repository->delete($chapter);

        return $this->respond([
            'message' => _tr('alerts.backend.chapter.deleted'),
        ]);
    }
    

    /**
     * validate chapter.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateChapter(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'cover' => 'numeric',
               ]);

        return $validation;
    }

    /**
     * validate message for validate chapter.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

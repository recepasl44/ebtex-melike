<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizNoteResource;
use App\Models\QuizNotes\QuizNote;
use App\Repositories\Backend\QuizNotes\QuizNoteRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizNotesController
 */
class QuizNotesController extends APIController
{
    /**
     * __construct.
     *
     * @var QuizNoteRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizNoteRepository $repository;
     */
    public function __construct(QuizNoteRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $quiznote.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizNoteResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizNote $quiznote
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizNote $quiznote)
    {
        return new QuizNoteResource($quiznote);
    }

    
     /**
      * Creates the Resource for quiznote.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizNote($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizNoteResource(QuizNote::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update quiznote.
         *
         * @param QuizNote    $quiznote
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizNote $quiznote)
    {
        $validation = $this->validateQuizNote($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($quiznote, $request->all());

        $quiznote = QuizNote::findOrfail($quiznote->id);

        return new QuizNoteResource($quiznote);
    }
    
    /**
     * Delete quiznote.
     *
     * @param QuizNote    $quiznote
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizNote $quiznote)
    {
        $this->repository->delete($quiznote);

        return $this->respond([
            'message' => _tr('alerts.backend.quiznote.deleted'),
        ]);
    }
    

    /**
     * validate quiznote.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizNote(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'note' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate quiznote.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}

<?php

namespace App\Http\Responses\Backend\BookQuizs;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Books\Book;
use App\Models\Quizzes\Quiz;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\BookQuizs\BookQuiz
     */
    protected $bookquizzes;

    /**
     * @param App\Models\BookQuizs\BookQuiz $bookquizzes
     */
    public function __construct($bookquizzes)
    {
        $this->bookquizzes = $bookquizzes;
    }

    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        $books= collect(Book::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$quizzes= collect(Quiz::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.bookquizzes.edit',compact('books', 'quizzes', ))->with([
            'bookquizzes' => $this->bookquizzes
        ]);
    }
}
<?php

namespace App\Http\Responses\Backend\BookQuizs;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Books\Book;
use App\Models\Quizzes\Quiz;


class CreateResponse implements Responsable
{
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
        
        return view('backend.bookquizzes.create',compact('books', 'quizzes', ));
    }
}
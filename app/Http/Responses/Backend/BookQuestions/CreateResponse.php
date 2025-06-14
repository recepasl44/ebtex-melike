<?php

namespace App\Http\Responses\Backend\BookQuestions;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Books\Book;
use App\Models\Questis\Questi;


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
                });$questis= collect(Questi::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.bookquestions.create',compact('books', 'questis', ));
    }
}
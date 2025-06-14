<?php

namespace App\Http\Responses\Backend\BookQuestions;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Books\Book;
use App\Models\Questis\Questi;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\BookQuestions\BookQuestion
     */
    protected $bookquestions;

    /**
     * @param App\Models\BookQuestions\BookQuestion $bookquestions
     */
    public function __construct($bookquestions)
    {
        $this->bookquestions = $bookquestions;
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
                });$questis= collect(Questi::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.bookquestions.edit',compact('books', 'questis', ))->with([
            'bookquestions' => $this->bookquestions
        ]);
    }
}
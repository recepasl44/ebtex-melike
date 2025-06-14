<?php

namespace App\Http\Responses\Backend\BookStudents;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Books\Book;
use App\Models\Students\Student;


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
                });$students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        
        return view('backend.bookstudents.create',compact('books', 'students', ));
    }
}
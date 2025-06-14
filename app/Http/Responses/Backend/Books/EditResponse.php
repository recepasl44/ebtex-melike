<?php

namespace App\Http\Responses\Backend\Books;

use Illuminate\Contracts\Support\Responsable;
use App\Models\Institutions\Institution;
use App\Models\Groups\Group;
use App\Models\BookPackages\BookPackage;
use App\Models\Periods\Period;
use App\Models\Programs\Program;
use App\Models\Levels\Level;
use App\Models\Classrooms\Classroom;
use App\Models\ExamRelevances\ExamRelevance;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Books\Book
     */
    protected $books;

    /**
     * @param App\Models\Books\Book $books
     */
    public function __construct($books)
    {
        $this->books = $books;
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
        $institutions= collect(Institution::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$groups= collect(Group::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$bookpackages= collect(BookPackage::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$periods= collect(Period::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$classrooms= collect(Classroom::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });$examrelevances= collect(ExamRelevance::all()->toArray())->mapWithKeys(function ($item) {
                    return [$item['id'] => $item['name']];
                });
        return view('backend.books.edit',compact('institutions', 'groups', 'bookpackages', 'periods', 'programs', 'levels', 'classrooms', 'examrelevances', ))->with([
            'books' => $this->books
        ]);
    }
}
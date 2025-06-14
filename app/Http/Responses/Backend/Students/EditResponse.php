<?php

namespace App\Http\Responses\Backend\Students;

use App\Models\Access\User\User;
use App\Models\Cities\City;
use App\Models\Counties\County;
use App\Models\Discounts\Discount;
use App\Models\Districts\District;
use App\Models\Guardians\Guardian;
use App\Models\Neighborhoods\Neighborhood;
use App\Models\Seasons\Season;
use App\Models\Services\Service;
use App\Models\Students\Student;
use Illuminate\Contracts\Support\Responsable;
use App\Models\Branches\Branche;
use App\Models\Countries\Country;
use App\Models\Programs\Program;
use App\Models\Levels\Level;
use App\Models\Courses\Course;
use App\Models\Schools\School;
use App\Models\Addresses\Address;
use Illuminate\Support\Facades\Schema;


class EditResponse implements Responsable
{
    /**
     * @var App\Models\Students\Student
     */
    protected $students;

    /**
     * @param App\Models\Students\Student $students
     */
    public function __construct($student)
    {
        $address_columns = Schema::getColumnListing('addresses');
        $guardian_columns = Schema::getColumnListing('guardians');

        foreach ($address_columns as $address_column) {
            $student->{'address['.$address_column.']'} = $student->address?->{$address_column};
        }
        foreach ($guardian_columns as $guardian_column) {
            if(request()->has('registration')) {
                $student->{'guardian['.$student->guardian->kinship_id.']['.$guardian_column.']'} = $student->guardian?->{$guardian_column};
            }else{
                $student->{'guardian['.$guardian_column.']'} = $student->guardian?->{$guardian_column};
            }
        }

        $this->students = $student;
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
        $branches= collect(Branche::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $programs= collect(Program::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $levels= collect(Level::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $courses= collect(Course::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $schools= collect(School::limit(5)->get()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $students= collect(Student::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['first_name'].' '.$item['last_name']];
        });
        $guardians= collect(Guardian::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['full_name']];
        });
        $users= collect(User::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['first_name'].' '.$item['last_name']];
        });
        $services= Service::all();
        $discounts= Discount::all();

        $seasons= collect(Season::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $countries= collect(Country::all()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $cities= collect(City::where('country_id', $this->students?->address?->country_id)->get()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $counties= collect(County::where('city_id', $this->students?->address?->city_id)->get()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $districts= collect(District::where('county_id', $this->students?->address?->county_id)->get()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
        $neighborhoods= collect(Neighborhood::where('district_id', $this->students?->address?->district_id)->get()->toArray())->mapWithKeys(function ($item) {
            return [$item['id'] => $item['name']];
        });
//        $cities = null;
//        $counties = null;
//        $districts = null;
//        $neighborhoods = null;
//        $schools = null;

        return view('backend.students.edit',compact('branches','services', 'seasons', 'discounts','countries', 'cities', 'counties', 'districts', 'neighborhoods', 'programs', 'levels', 'courses', 'schools', 'guardians', 'users','students' ))->with([
            'students' => $this->students
        ]);
    }
}
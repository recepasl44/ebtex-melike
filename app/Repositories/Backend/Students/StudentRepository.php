<?php

namespace App\Repositories\Backend\Students;

use App\Models\Agreements\Agreement;
use App\Models\Discounts\Discount;
use App\Models\Enrollments\Enrollment;
use App\Models\Installments\Installment;
use App\Models\ScholarshipApplications\ScholarshipApplication;
use App\Models\Scholarships\Scholarship;
use App\Models\Services\Service;
use App\Repositories\Backend\Addresses\AddressRepository;
use DB;
use Carbon\Carbon;
use App\Models\Students\Student;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

/**
 * Class StudentRepository.
 */
class StudentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Student::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        $data = $this->query()
            ->select([
                config('module.students.table').'.id',
                config('module.students.table').'.branche_id',
                config('module.students.table').'.nationality_id',
                config('module.students.table').'.identification_no',
                config('module.students.table').'.gender_id',
                config('module.students.table').'.first_name',
                config('module.students.table').'.last_name',
                config('module.students.table').'.student_no',
                config('module.students.table').'.birthday',
                config('module.students.table').'.program_id',
                config('module.students.table').'.level_id',
                config('module.students.table').'.course_id',
                config('module.students.table').'.school_id',
                config('module.students.table').'.email',
                config('module.students.table').'.phone',
                config('module.students.table').'.mobile_phone',
                config('module.students.table').'.address_id',
                config('module.students.table').'.parent_id',
                config('module.students.table').'.financial_status',
                config('module.students.table').'.additional_information_1',
                config('module.students.table').'.additional_information_2',
                config('module.students.table').'.class_teacher_id',
                config('module.students.table').'.advisor_teacher_id',
                config('module.students.table').'.guide_teacher_id',
                config('module.students.table').'.profile_picture',
                config('module.students.table').'.created_by',

                config('module.students.table').'.created_at',
                config('module.students.table').'.updated_at',
                config('module.students.table').'.status',
            ]);
        if(request()->has('branche_id') && !empty(request()->get('branche_id'))){
            $data = $data->where('branche_id', request()->get('branche_id'));
        }
        if(request()->has('nationality_id') && !empty(request()->get('nationality_id'))){
            $data = $data->where('nationality_id', request()->get('nationality_id'));
        }
        if(request()->has('gender_id') && !empty(request()->get('gender_id'))){
            $data = $data->where('gender_id', request()->get('gender_id'));
        }
        if(request()->has('student_no') && !empty(request()->get('student_no'))){
            $data = $data->where('student_no', request()->get('student_no'));
        }
        if(request()->has('program_id') && !empty(request()->get('program_id'))){
            $data = $data->where('program_id', request()->get('program_id'));
        }
        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
        }
        if(request()->has('course_id') && !empty(request()->get('course_id'))){
            $data = $data->where('course_id', request()->get('course_id'));
        }
        if(request()->has('school_id') && !empty(request()->get('school_id'))){
            $data = $data->where('school_id', request()->get('school_id'));
        }
        if(request()->has('address_id') && !empty(request()->get('address_id'))){
            $data = $data->where('address_id', request()->get('address_id'));
        }
        if(request()->has('parent_id') && !empty(request()->get('parent_id'))){
            $data = $data->where('parent_id', request()->get('parent_id'));
        }
        if(request()->has('identification_no') && !empty(request()->get('identification_no'))){
            $data = $data->where('identification_no', request()->get('identification_no'));
        }
        if(request()->has('status') && !empty(request()->get('status'))){
            $data = $data->where('status', request()->get('status'));
        }


        if(request()->has('first_name') && !empty(request()->get('first_name'))){
            $data = $data->where('first_name', 'like', '%'.request()->get('first_name').'%');
        }
        if(request()->has('last_name') && !empty(request()->get('last_name'))){
            $data = $data->where('last_name', 'like', '%'.request()->get('last_name').'%');
        }
        return $data;
    }

    public function getForInternal()
    {
        $season = request()->has('season_id') ? request()->get('season_id') : 1;
        $next_season = $season + 1;
        return DB::table('students as s1')
            ->selectRaw('
        COUNT(CASE WHEN s1.season_id = '.$season.' THEN 1 END) AS registered,
        COUNT(CASE WHEN s1.season_id = '.$next_season.' THEN 1 END) AS next_season_registered,
        COUNT(CASE WHEN s1.season_id = '.$season.' AND EXISTS (
            SELECT 1 FROM students as s2
            WHERE s2.identification_no = s1.identification_no AND s2.season_id = '.$next_season.'
        ) THEN 1 END) AS both_season_registered,
        COUNT(*) AS all_registered
    ');
    }

    public function getRegisterNo()
    {
        $brancheId = request()->get('branche_id');
        $schoolId = request()->get('school_id');

        return DB::table('students')
            ->where('branche_id', $brancheId)
            ->where('school_id', $schoolId)
            ->selectRaw('
        COUNT(*) AS student_count,
        MAX(register_no) AS max_register_no
    ');

    }

    /**
     * For Creating the respective model in storage
     *
     * @param array $input
     * @throws GeneralException
     * @return bool
     */
    public function create(array $input)
    {
        try {
            DB::transaction(function () use (&$student, $input) {
                if (empty($input['created_by'])) {
                    $input['created_by'] = access()->user()->id ?? 1;
                }
                if(!empty($input['services_final']) && empty($input['status'])){
                    $input['status'] = 1;
                }
                if(!empty($input['profile_picture'])){
                    $input = $this->uploadImage($input, 'student', 'profile_picture');
                }
                if(!empty($input['student_id'])){
                    $student = Student::find($input['student_id']);
                }else{
                    $student = Student::create($input);
                }
                if (!empty($student)) {
                    if (!empty($input['address'])) {
                        $student->address_id = $student->addresses()->create($input['address']);
                    }
                    if (!empty($input['guardian'])) {
                        $student->parent_id = $student->guardians()->create($input['guardian']);
                    }
                    if(!empty($input['services'])){
                        $student->services()->syncWithoutDetaching($input['services']);
                    }
                    if(!empty($input['discounts'])){
                        $student->discounts()->syncWithoutDetaching($input['discounts']);
                    }
                    if(!empty($input['services_final'])){
                        $student->services()->syncWithoutDetaching($input['services_final']);
                    }
                    if(!empty($input['agreement_file'])){
                        $file = $this->uploadFile($input, 'agreements', 'agreement_file');
                        $studentAgreement = new Agreement();
                        $studentAgreement->student_id = $student->id;
                        $studentAgreement->name = "Kayıt Sözleşmesi";
                        $studentAgreement->path = $file['agreement_file'];
                        $studentAgreement->save();
                    }
                    if(!empty($input['step']) && $input['step'] == 3){
                        $services = $student->services;
                        $discounts = $student->discounts;
                        $this->calculate($services, $discounts, $input['services_dates'], $input['taxes'], $input['fees'], $input['advance_prices'] ?? [], $input['payment_methods'] ?? [], $student);
                    }

                    $student->save();
                    return true;
                }
            });
        } catch (Exception $e) {
            dd("İşlem gerçekleştirilemedi.", $e->getMessage());
            throw new GeneralException(trans('exceptions.backend.students.create_error'));
            // Hata olursa işlem geri alınır ve $userId null kalır

        }
    }

    public function scholarship(array $input)
    {
        try {
            DB::transaction(function () use (&$student, $input) {
                if (empty($input['created_by'])) {
                    $input['created_by'] = access()->user()->id ?? 1;
                }

                $input['status'] = 2;
                $input['type'] = 'scholarship';
                $input = $this->uploadImage($input, 'student', 'profile_picture');


                if ($student = Student::create($input)) {
                    if (!empty($input['guardian'])) {
                        $student->parent_id = $student->guardians()->create($input['guardian']);
                    }
                    $student->save();
                    $scholarship = Scholarship::where('status', 1)->first();
                    $sa = new ScholarshipApplication();
                    $sa->student_id = $student->id;
                    $sa->scholarship_id = $scholarship->id ?? 1;
                    $sa->save();


                    return true;
                }
            });
        } catch (Exception $e) {
            dd("İşlem gerçekleştirilemedi.", $e->getMessage());
            throw new GeneralException(trans('exceptions.backend.students.create_error'));
            // Hata olursa işlem geri alınır ve $userId null kalır

        }
    }


    /**
     * For updating the respective Model in storage
     *
     * @param Student $student
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Student $student, array $input)
    {
        try {
            DB::transaction(function () use (&$student, $input) {
                if(empty($input['created_by'])){
                    $input['created_by'] = access()->user()->id ?? 1;
                }
                if(!empty($input['services']) && empty($input['status'])){
                    $input['status'] = 1;
                }
                // Uploading Image
                if (array_key_exists('profile_picture', $input)) {
                    $this->deleteOldFile($student, 'profile_picture');
                    $input = $this->uploadImage($input, 'student', 'profile_picture');
                }
                if ($student->update($input)){
                    if(!empty($input['address'])){
                        $student->address->update($input['address']);
                    }
                    if(!empty($input['guardian'])){
                        if(is_array($input['guardian'])){
                            foreach ($input['guardian'] as $guardian){
                                if(!empty($guardian['identification_no'])){
                                    $g = $student->guardians()->create($guardian);
                                    if(!empty($guardian['is_parent'])){
                                        $student->parent_id = $g->id;
                                    }
                                }
                            }
                        }else{
                            $student->guardian->update($input['guardian']);
                        }

                    }
                    if(!empty($input['services'])){
                        $student->services()->syncWithoutDetaching($input['services']);
                    }
                    if(!empty($input['discounts'])){
                        $student->discounts()->syncWithoutDetaching($input['discounts']);
                    }
                    if(!empty($input['services_final'])){
                        $student->services()->syncWithoutDetaching($input['services_final']);
                    }
                    if(!empty($input['agreement_file'])){
                        $file = $this->uploadFile($input, 'agreements', 'agreement_file');
                        $studentAgreement = new Agreement();
                        $studentAgreement->student_id = $student->id;
                        $studentAgreement->name = "Kayıt Sözleşmesi";
                        $studentAgreement->path = $file['agreement_file'];
                        $studentAgreement->save();
                    }
                    if(!empty($input['step']) && $input['step'] == 3){
                        $services = $student->services;
                        $discounts = $student->discounts;
                        $this->calculate($services, $discounts, $input['services_dates'], $input['taxes'], $input['fees'], $input['advance_prices'] ?? [], $input['payment_methods'] ?? [], $student);
                    }
                    return true;
                }
            });
        } catch (Exception $e) {
            dd("İşlem gerçekleştirilemedi.", $e->getMessage());
            throw new GeneralException(trans('exceptions.backend.students.update_error'));
            // Hata olursa işlem geri alınır ve $userId null kalır

        }
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Student $student
     * @throws GeneralException
     * @return bool
     */
    public function delete(Student $student)
    {
        if ($student->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.students.delete_error'));
    }

    public function calculate($services, $discounts, $dates, $taxes, $fees, $advance_prices, $payment_methods, $student): void
    {
//        $services = Service::whereIn('id', $services)->get();
//        $discounts = Discount::whereIn('id', $discounts)->get();
        $disc = 0;
        $datas = [];

        foreach ($services as $s => $service){
            foreach ($discounts as $discount){
                if($discount->discount_type == 0 && $service->id == $discount->service_id ){
                    if($discount->type == 0){
                        $disc += (($service->price * $discount->amount) / 100 );
                    }else{
                        $disc += $discount->amount;
                    }
                }elseif($service->is_main == 1){
                    if($discount->type == 0){
                        $disc += (($service->price * $discount->amount) / 100 );
                    }else{
                        $disc += $discount->amount;
                    }
                }else{
                    $disc = 0;
                }

                $datas[$service->id]['discount'] = $disc ?? 0;
                $datas[$service->id]['final_price'] = $service->price - $disc;
                $datas[$service->id]['advance_price'] = $advance_prices[$s] ?? 0;
                $datas[$service->id]['fees'] = $fees[$s] ?? null;
                $datas[$service->id]['payment_method'] = $payment_methods[$s] ?? null;
                $datas[$service->id]['taxes_started_at'] = $dates[$service->id] ?? Carbon::now();
                $datas[$service->id]['taxes'] = ($taxes[$service->id] ?? 0) + 1;
                $datas[$service->id]['student_id'] = $student->id;
            }
        }
        Log::error(json_encode($services));
        Log::error(json_encode($datas));
        $this->createEnrollments($services, $datas);
    }

    private function createEnrollments($services, $datas): void
    {
        foreach ($services as $s => $service){
            if (isset($datas[$service->id]['student_id']) && $datas[$service->id]['student_id'] > 0 && isset($service->id) && $service->id > 0) {

                $studentId = (int) $datas[$service->id]['student_id'];
                $serviceId = (int) $service->id;
                $discount = $datas[$serviceId]['discount'] ?? 0;
                $advance = $datas[$serviceId]['advance_price'] ?? 0;
                $finalFee = $service->price - $discount;
                $remaining = $finalFee - $advance;

                if(!is_int($studentId) || !is_int($serviceId)){
                    dd($studentId, $serviceId);
                }

                // Burada null ve 0'ları kontrol ediyoruz
                if ($studentId == null || $studentId == 0 || $serviceId == null || $serviceId == 0) {
                    dd('Geçersiz student_id veya service_id:', [
                        'student_id' => $studentId,
                        'service_id' => $serviceId,
                    ]);
                }

                $enrollment = Enrollment::firstOrNew([
                    'student_id' => $studentId,
                    'service_id' => $serviceId,
                ]);

                $enrollment->student_id = $studentId;
                $enrollment->service_id = $serviceId;
                $enrollment->total_fee = $service->price;
                $enrollment->discount = $discount;
                $enrollment->payment_method_id = $datas[$serviceId]['payment_method'] ?? null;
                $enrollment->final_fee = $finalFee;
                $enrollment->advance_fee = $advance;
                $enrollment->remaining_fee = $remaining;

                $enrollment->save();

            } else {
                // student_id veya service_id'nin geçersiz olduğu durumlar için log tutma
                dd('Boş veya geçersiz veriler:', [
                    'datas' => $datas,
                    'service_id' => $service->id,
                    'student_id' => $datas[$service->id]['student_id'] ?? null,
                ]);
            }




            for ($i = 0; $i < ($datas[$service->id]['taxes'] ?? 0); $i++) {
                $remaining_price = ($service->price - ($datas[$service->id]['discount'] ?? 0) - ($datas[$service->id]['advance_price'] ?? 0) );
                $fees = $datas[$service->id]['fees'] ?? ($datas[$service->id]['final_price'] / ($datas[$service->id]['taxes'] ?? 1) );
                $due_date = Carbon::parse($datas[$service->id]['taxes_started_at']);
                $due_date = $due_date->addMonths($i);

                Installment::updateOrCreate(
                    [
                        'enrollment_id' => $enrollment->id,
                        'due_date' => $due_date,
                        'order_no' => $i+1,
                    ],
                    [
                        'amount' => ($service->taxes - $i != 1) ? $fees : ( $remaining_price - ($fees * (($datas[$service->id]['taxes'] ?? 1) - 1)) ),
                    ]
                );
            }

        }
    }

}

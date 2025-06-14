<?php
namespace App\Imports;

use App\Models\Guardians\Guardian;
use App\Models\Students\Student;  // Student modelini dahil ettik
use App\Supports\Carbon;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Row;
use Maatwebsite\Excel\Validators\Failure;

class StudentsImport implements OnEachRow, WithValidation, SkipsOnFailure
{
    use SkipsFailures;  // Hataları yakalamak için eklenir
    public $validationFailures = []; // Public olarak tanımladık

    protected $request;

    // Construct ile request verisini alıyoruz
    public function __construct($request)
    {
        $this->request = $request;
    }


    // onEachRow metodunu kullanarak her satırı kontrol ederiz
    public function onEachRow(Row $row)
    {
        dd('asdasd');
    }

    public function onRow(Row $row)
    {
        $index = $row->getIndex(); // Satırın index numarasını alıyoruz

        // Eğer başlık satırını atlamak istiyorsanız (index == 1), atlayın
        if ($index == 1) {
            return; // İlk satır başlık olduğu için atlanır
        }

        // Satırdaki veriyi modelle kaydediyoruz (row array olarak gelir)
        $data = $row->toArray();  // Satırdaki veriyi dizi olarak alıyoruz


        $validator = Validator::make($data, [
            '0' => 'required|date',
            '1' => 'required|numeric|digits:11',
            '2' => 'required|in:K,E',
            '3' => 'required|string|max:255',
            '4' => 'required|string|max:255',
            '5' => 'required|date',
            '6' => 'nullable|string',
            '7' => 'nullable|email',
            '8' => 'nullable|numeric',
            '9' => 'nullable|numeric',
            '10' => 'required|numeric',
            '11' => 'required|string',
            '12' => 'required|string',
            '13' => 'required|numeric',
        ]);
        if ($validator->fails()) {
            // Hataları $validationFailures dizisine ekle
            $this->validationFailures[] = [
                'row' => $row->getIndex(),
                'errors' => $validator->errors()->all()
            ];
            return; // Hatalı satırı kaydetmiyoruz
        }

        $guardian = new Guardian([
            'identification_no' => $data[10],
            'full_name' => $data[11],
            'kinship' => $data[12],
            'phone' => $data[13],
        ]);

        // Örnek: Index numarasıyla işlem yapıyoruz
        $student = new Student([
            'created_at' => Carbon::parse($data[0]),
            'identification_no' => $data[1],
            'gender_id' => $data[2] == "K" ? 1 : 0,
            'first_name' => $data[3],
            'last_name' => $data[4],
            'birthday' => Carbon::parse($data[5]),
            'level' => $data[6],
            'email' => $data[7],
            'phone' => $data[8],
            'mobile_phone' => $data[9],
            'guardian_id' => $guardian->save(),
            'branche_id' => $this->request->branche_id ?? 1,
            // Diğer sütunlar
        ]);

        $student->save();  // Veriyi kaydediyoruz
    }

    public function rules(): array
    {
        return [
            '0' => 'required|date',               // created_at tarihi
            '1' => 'required|numeric|digits:11',  // identification_no 11 haneli numara
            '2' => 'required|in:K,E',             // gender_id yalnızca "K" veya "E" olabilir
            '3' => 'required|string|max:255',     // first_name
            '4' => 'required|string|max:255',     // last_name
            '5' => 'required|date',               // birthday tarihi
            '6' => 'nullable|string',            // level sayısal bir değer veya boş olabilir
            '7' => 'nullable|email',              // email geçerli e-posta formatında veya boş
            '8' => 'nullable|numeric',            // phone numara veya boş olabilir
            '9' => 'nullable|numeric',            // mobile_phone numara veya boş olabilir
            '10' => 'required|numeric',
            '11' => 'required|string',
            '12' => 'required|string',
            '13' => 'required|numeric',
            // Diğer sütunlar için kurallar
        ];
    }

    public function customValidationMessages()
    {
        return [
            '0.required' => 'Kayit tarihi gereklidir.',
            '0.date' => 'Kayit tarihi geçerli bir tarih formatında olmalıdır.',
            '1.required' => 'Kimlik numarası gereklidir.',
            '1.numeric' => 'Kimlik numarası yalnızca sayısal olmalıdır.',
            '1.digits' => 'Kimlik numarası tam olarak 11 haneli olmalıdır.',
            '2.required' => 'Cinsiyet bilgisi gereklidir.',
            '2.in' => 'Cinsiyet bilgisi yalnızca "K" veya "E" olabilir.',
            '3.required' => 'İsim gereklidir.',
            '3.string' => 'İsim metin formatında olmalıdır.',
            '4.required' => 'Soyisim gereklidir.',
            '4.string' => 'Soyisim metin formatında olmalıdır.',
            '5.required' => 'Doğum tarihi gereklidir.',
            '5.date' => 'Doğum tarihi geçerli bir tarih formatında olmalıdır.',
            '6.string' => 'Seviye metin formatında olmalıdır.',
            '6.numeric' => 'Seviye metin formatında olmalıdır.',
            '7.email' => 'E-posta geçerli bir e-posta formatında olmalıdır.',
            '8.numeric' => 'Telefon numarası yalnızca sayısal olabilir.',
            '9.numeric' => 'Cep telefonu numarası yalnızca sayısal olabilir.',
            '10.required' => 'Cep telefonu numarası gereklidir.',
            '10.numeric' => 'Cep telefonu numarası yalnızca sayısal olabilir.',
            '11.required' => 'İsim Soyisim gereklidir.',
            '11.string' => 'İsim Soyisim metin formatında olmalıdır.',
            '12.required' => 'Yakınlık gereklidir.',
            '12.string' => 'Yakınlık metin formatında olmalıdır.',
            '13.required' => 'Cep telefonu numarası gereklidir.',
            '13.numeric' => 'Cep telefonu numarası yalnızca sayısal olabilir.',

            // Diğer özel hata mesajları
        ];
    }

    public function onFailure(Failure ...$failures)
    {
        if(!empty($failures)){
            foreach ($failures as $failure) {
                if ($failure->row() > 1) {
                    $this->validationFailures[] = [
                        'row' => $failure->row(),
                        'errors' => $failure->errors()
                    ];
                }
            }
        }else{
            $this->validationFailures[] = [];
        }

        return view('backend.students.import', compact('failures'));
        // TODO: Implement onFailure() method.
    }
}

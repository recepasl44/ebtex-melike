<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Imports\CurriculumImport;
use App\Models\Curriculum\Unit;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\DB;

class CurriculumController extends Controller
{
    /**
     * List all Units with relations.
     */
    public function index(Request $request)
    {
        $search = $request->query('search', '');
        $paginate = $request->query('paginate', 10);

        // İlişkilerle birlikte Unit sorgusu
        // DİKKAT: details yerine achievementDetail
        $query = Unit::with('chapters.topics.achievements.achievementDetail');

        // Arama
        if ($search) {
            $query->where('name', 'LIKE', "%$search%");
        }

        // Sayfalama
        $units = $query->paginate($paginate);

        return response()->json($units, 200);
    }

    /**
     * Show detailed information of a specific Unit.
     */
    public function show($id)
    {
        // details yerine achievementDetail
        $unit = Unit::with('chapters.topics.achievements.achievementDetail')->findOrFail($id);

        return response()->json($unit, 200);
    }

    /**
     * Store Curriculum data (manual or from Excel).
     */
    public function store(Request $request)
    {
        // "official" veya "application" gelebilir
        $curriculumType = $request->input('curriculum_type');

        // Her iki tür için de minimum doğrulama
        $baseValidation = [
            'unit' => 'required|array',
            'unit.name' => 'required|string',
            'unit.numbering' => 'required|string',
        ];

        if ($curriculumType === 'official') {
            // Resmî müfredat (kazanım zorunlu)
            $rules = array_merge($baseValidation, [
                'chapters' => 'required|array',
                'chapters.*.name' => 'required|string',
                'chapters.*.numbering' => 'required|string',
                'chapters.*.topics' => 'required|array',

                'chapters.*.topics.*.name' => 'required|string',
                'chapters.*.topics.*.numbering' => 'required|string',
                'chapters.*.topics.*.achievements' => 'required|array',
                'chapters.*.topics.*.achievements.*.name' => 'required|string',
                'chapters.*.topics.*.achievements.*.numbering' => 'required|string',
                // achievement_detail -> opsiyonel
            ]);
        } else {
            // Uygulama müfredatı
            $rules = array_merge($baseValidation, [
                'chapters' => 'required|array',
                'chapters.*.name' => 'required|string',
                'chapters.*.numbering' => 'required|string',
                'chapters.*.topics' => 'required|array',

                'chapters.*.topics.*.name' => 'required|string',
                'chapters.*.topics.*.numbering' => 'required|string',
                // achievements yok
            ]);
        }

        // Validasyon
        $data = $request->validate($rules);

        DB::beginTransaction();

        try {
            // 1) Unit oluştur
            $unit = new Unit();
            $unit->name = $data['unit']['name'];
            $unit->numbering = $data['unit']['numbering'];
            $unit->curriculum_type = $curriculumType;
            $unit->save();

            // 2) Chapters
            foreach ($data['chapters'] as $chapterData) {
                $chapter = $unit->chapters()->create([
                    'name' => $chapterData['name'],
                    'numbering' => $chapterData['numbering'],
                ]);

                // 3) Topics
                foreach ($chapterData['topics'] as $topicData) {
                    $topic = $chapter->topics()->create([
                        'name' => $topicData['name'],
                        'numbering' => $topicData['numbering'],
                    ]);

                    // Resmî müfredat -> Achievements var
                    if ($curriculumType === 'official' && !empty($topicData['achievements'])) {
                        foreach ($topicData['achievements'] as $achievementData) {
                            $achievement = $topic->achievements()->create([
                                'name' => $achievementData['name'],
                                'numbering' => $achievementData['numbering'],
                            ]);

                            // achievement_detail varsa (opsiyonel)
                            if (!empty($achievementData['achievement_detail'])) {
                                $achievement->achievementDetail()->create([
                                    'score' => $achievementData['achievement_detail']['score'] ?? null,
                                    'lesson_duration' => $achievementData['achievement_detail']['lesson_duration'] ?? null,
                                    'difficulty_level' => $achievementData['achievement_detail']['difficulty_level'] ?? null,
                                    'tests' => $achievementData['achievement_detail']['tests'] ?? null,
                                    'notes' => $achievementData['achievement_detail']['notes'] ?? null,
                                ]);
                            }
                        }
                    }
                }
            }

            DB::commit();

            return response()->json(['message' => 'Curriculum successfully created.'], 201);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'error' => 'An error occurred while creating the curriculum.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Import Curriculum data from Excel (opsiyonel).
     */public function import(Request $request)
{
    $request->validate([
        'file' => 'required|file|mimes:xlsx,csv',
    ]);

    DB::beginTransaction();

    try {
        // Excel ile veriyi import et
        Excel::import(new CurriculumImport, $request->file('file'));

        DB::commit();
        return response()->json(['message' => 'Curriculum successfully imported.'], 200);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'error' => 'An error occurred while importing the curriculum.',
            'details' => $e->getMessage()
        ], 500);
    }
}


    /**
     * Update a specific Unit and its relations.
     */
    public function update(Request $request, $id)
    {
        $unit = Unit::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string',
            'numbering' => 'required|string',
        ]);

        $unit->update($data);

        return response()->json([
            'message' => 'Curriculum successfully updated.',
            'data' => $unit
        ], 200);
    }

    /**
     * Delete a specific Unit and its relations.
     */
    public function destroy($id)
    {
        $unit = Unit::findOrFail($id);
        $unit->delete();

        return response()->json(['message' => 'Curriculum successfully deleted.'], 200);
    }
}




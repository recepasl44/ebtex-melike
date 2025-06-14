<?php

namespace App\Http\Controllers\Backend\QuestionPdfs;

use App\Http\Responses\Backend\QuestionPdfs\ShowResponse;
use App\Models\QuestionPdfs\QuestionPdf;
use App\Models\Questions\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\QuestionPdfs\CreateResponse;
use App\Http\Responses\Backend\QuestionPdfs\EditResponse;
use App\Repositories\Backend\QuestionPdfs\QuestionPdfRepository;
use App\Http\Requests\Backend\QuestionPdfs\ManageQuestionPdfRequest;
use App\Http\Requests\Backend\QuestionPdfs\CreateQuestionPdfRequest;
use App\Http\Requests\Backend\QuestionPdfs\StoreQuestionPdfRequest;
use App\Http\Requests\Backend\QuestionPdfs\EditQuestionPdfRequest;
use App\Http\Requests\Backend\QuestionPdfs\UpdateQuestionPdfRequest;
use App\Http\Requests\Backend\QuestionPdfs\DeleteQuestionPdfRequest;
use Illuminate\Support\Facades\Storage;

/**
 * QuestionPdfsController
 */
class QuestionPdfsController extends Controller
{
    /**
     * variable to store the repository object
     * @var QuestionPdfRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuestionPdfRepository $repository;
     */
    public function __construct(QuestionPdfRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\QuestionPdfs\ManageQuestionPdfRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageQuestionPdfRequest $request)
    {
        return new ViewResponse('backend.questionpdfs.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateQuestionPdfRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuestionPdfs\CreateResponse
     */
    public function create(CreateQuestionPdfRequest $request)
    {
        return new CreateResponse('backend.questionpdfs.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreQuestionPdfRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreQuestionPdfRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method

        $pdf_id = $this->repository->create($input);

        //return with successfull message
        return new RedirectResponse(route('admin.questionpdfs.show', $pdf_id), ['flash_success' => _tr('alerts.backend.questionpdfs.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuestionPdfs\QuestionPdf  $questionpdf
     * @param  EditQuestionPdfRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuestionPdfs\EditResponse
     */
    public function edit(QuestionPdf $questionpdf, EditQuestionPdfRequest $request)
    {
        return new EditResponse($questionpdf);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\QuestionPdfs\QuestionPdf  $questionpdf
     * @param  EditQuestionPdfRequestNamespace  $request
     * @return \App\Http\Responses\Backend\QuestionPdfs\EditResponse
     */
    public function show(QuestionPdf $questionpdf)
    {
        return new ShowResponse($questionpdf);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateQuestionPdfRequestNamespace  $request
     * @param  App\Models\QuestionPdfs\QuestionPdf  $questionpdf
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateQuestionPdfRequest $request, QuestionPdf $questionpdf)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $questionpdf, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.questionpdfs.index'), ['flash_success' => _tr('alerts.backend.questionpdfs.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteQuestionPdfRequestNamespace  $request
     * @param  App\Models\QuestionPdfs\QuestionPdf  $questionpdf
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(QuestionPdf $questionpdf, DeleteQuestionPdfRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($questionpdf);
        //returning with successfull message
        return new RedirectResponse(route('admin.questionpdfs.index'), ['flash_success' => _tr('alerts.backend.questionpdfs.deleted')]);
    }

    public function saveQuestion(Request $request)
    {
        $validated = $request->validate([
            'pdf_id' => 'required|exists:questionpdfs,id',
            'program_id' => 'required|exists:programs,id',
            'correct_answer' => 'required|string|in:A,B,C,D,E',
            'page_number' => 'required|integer',
            'x' => 'required|integer',
            'y' => 'required|integer',
            'width' => 'required|integer',
            'height' => 'required|integer',
        ]);

        $pdf = QuestionPdf::find($request->pdf_id);
        $pdfPath = storage_path('app/public/' . $pdf->file_path);

        if (!Storage::exists('public/cropped')) {
            Storage::makeDirectory('public/cropped');
        }
        // Poppler ile PDF sayfasını PNG'ye çevirme (pdftoppm)
        $outputPath = storage_path('app/public/cropped/') . uniqid().'.png';
        $cmd = "pdftoppm -png -f {$validated['page_number']} -l {$validated['page_number']} {$pdfPath} {$outputPath}";
        $output = null;
        $resultCode = null;
        exec($cmd, $output, $resultCode);

        if ($resultCode !== 0) {
            // Detaylı hata mesajı
            return response()->json(['error' => 'PDF to image conversion failed.', 'output' => implode("\n", $output), 'cmd' => $cmd]);
        }

        // Çıkan PNG dosyasını aç
        $imagePath = $outputPath . "-".str_pad($validated['page_number'], 2, '0', STR_PAD_LEFT).".png"; // Poppler -1.png uzantısı ekler
        if (!file_exists($imagePath)) {
            return response()->json(['error' => 'PNG file not created.', 'path' => $imagePath]);
        }

        $image = imagecreatefrompng($imagePath);
        if (!$image) {
            return response()->json(['error' => 'Failed to open image.']);
        }

        // Çıkan resmi kırpma
        $croppedImage = imagecrop($image, [
            'x' => $validated['x'],
            'y' => $validated['y'],
            'width' => $validated['width'],
            'height' => $validated['height']
        ]);

        if ($croppedImage === false) {
            return response()->json(['error' => 'Image cropping failed.']);
        }

        // Kırpılmış resmi kaydetme
        $croppedPath = "cropped/" . uniqid() . ".png";
        imagepng($croppedImage, storage_path("app/public/{$croppedPath}"));
        imagedestroy($croppedImage);
        imagedestroy($image);

        // Soru veritabanına kaydedilir
        $question = Question::create([
            'pdf_id' => $validated['pdf_id'],
            'program_id' => $validated['program_id'],
            'correct_answer' => $validated['correct_answer'],
            'page_number' => $validated['page_number'],
            'x' => $validated['x'],
            'y' => $validated['y'],
            'width' => $validated['width'],
            'height' => $validated['height'],
            'image_path' => $croppedPath, // Yeni alan
        ]);

        return response()->json(['success' => true, 'question' => $question]);
    }
    
}

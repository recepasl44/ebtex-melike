<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response as IlluminateResponse;
use Illuminate\Support\Str;
use Response;

/**
 * Base API Controller. test pipline denemesi 1.21
 */
class APIController extends Controller
{
    /**
     * default status code.
     *
     * @var int
     */
    protected $statusCode = 200;

    public function __construct()
    {
        $this->authorizeRequest();
    }

    /**
     * get the status code.
     *
     * @return statuscode
     */
    public function getStatusCode()
    {
        return $this->statusCode;
    }


    /**
     * set the status code.
     *
     * @param [type] $statusCode [description]
     *
     * @return statuscode
     */
    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;

        return $this;
    }

    /**
     * Respond.
     *
     * @param array $data
     * @param array $headers
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respond($data, $headers = [])
    {
        return response()->json($data, $this->getStatusCode(), $headers);
    }

    /**
     * respond with pagincation.
     *
     * @param Paginator $items
     * @param array     $data
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondWithPagination($items, $data)
    {
        $data = array_merge($data, [
            'paginator' => [
                'total_count'  => $items->total(),
                'total_pages'  => ceil($items->total() / $items->perPage()),
                'current_page' => $items->currentPage(),
                'limit'        => $items->perPage(),
             ],
        ]);

        return $this->respond($data);
    }

    /**
     * Respond Created.
     *
     * @param string $message
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondCreated($data)
    {
        return $this->setStatusCode(201)->respond([
            'data' => $data,
        ]);
    }

    /**
     * Respond Created with data.
     *
     * @param string $message
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondCreatedWithData($data)
    {
        return $this->setStatusCode(201)->respond($data);
    }

    /**
     * respond with error.
     *
     * @param $message
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondWithError($message)
    {
        return $this->respond([
                'error' => [
                    'message'     => $message,
                    'status_code' => $this->getStatusCode(),
                ],
            ]);
    }

    /**
     * responsd not found.
     *
     * @param string $message
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondNotFound($message = 'Not Found')
    {
        return $this->setStatusCode(IlluminateResponse::HTTP_NOT_FOUND)->respondWithError($message);
    }

    /**
     * Respond with error.
     *
     * @param string $message
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondInternalError($message = 'Internal Error')
    {
        return $this->setStatusCode(500)->respondWithError($message);
    }

    /**
     * Respond with unauthorized.
     *
     * @param string $message
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondUnauthorized($message = 'Unauthorized')
    {
        return $this->setStatusCode(401)->respondWithError($message);
    }

    /**
     * Respond with forbidden.
     *
     * @param string $message
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondForbidden($message = 'Forbidden')
    {
        return $this->setStatusCode(403)->respondWithError($message);
    }

    /**
     * Respond with no content.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithNoContent()
    {
        return $this->setStatusCode(204)->respond(null);
    }

    /**Note this function is same as the below function but instead of responding with error below function returns error json
     * Throw Validation.
     *
     * @param string $message
     *
     * @return mix
     */
    public function throwValidation($message)
    {
        return $this->setStatusCode(422)
            ->respondWithError($message);
    }

    protected function authorizeRequest()
    {
        $exceptControllers = ['AuthController'];
        $route = request()->route();
        if (!$route) return;

        $action = $route->getActionMethod(); // örn: index, store, update
        $controllerFull = $route->getAction()['controller'] ?? null;
        if (!$controllerFull) return;

        [$controllerClass, $method] = explode('@', $controllerFull);
        $controllerName = class_basename($controllerClass); // örn: AgreementsController
        if(in_array($controllerName, $exceptControllers)) return;

        $resourceNamePlural = Str::of($controllerName)->replace('Controller', '')->kebab(); // örn: agreements
        $resourceNameSingular = Str::singular($resourceNamePlural);

        $abilities = [
            'index' => 'manage',
            'show' => 'manage',
            'store' => 'store',
            'update' => 'update',
            'destroy' => 'delete',
        ];

        if (isset($abilities[$action])) {
            $ability = $abilities[$action] . '-' . $resourceNameSingular;
            if (access()->allow($ability)) {
                return $this->respondUnauthorized('Unauthorized action:  ' . $ability);
            }
        }
    }
}

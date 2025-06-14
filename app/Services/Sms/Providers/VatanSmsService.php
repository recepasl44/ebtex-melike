<?php
namespace App\Services\Sms\Providers;

use App\Services\Sms\SmsServiceInterface;
use GuzzleHttp\Client;

class VatanSmsService implements SmsServiceInterface
{
    protected $apiId;
    protected $apiKey;
    protected $origin;

    public function __construct(array $config)
    {
        $this->apiId = $config['api_id'] ?? null;
        $this->apiKey = $config['api_key'] ?? null;
        $this->origin = $config['origin'] ?? null;
    }

    public function send(string $phone, string $message): bool|string
    {
        try {
            $client = new Client();
            $response = $client->post('https://api.vatansms.net/sms/send', [
                'form_params' => [
                    'api_id' => $this->apiId,
                    'api_key' => $this->apiKey,
                    'origin' => $this->origin,
                    'number' => $phone,
                    'message' => $message,
                ],
            ]);
            $body = (string) $response->getBody();

            if (strpos($body, 'SUCCESS') !== false) {
                return true;
            }
            return $body;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}

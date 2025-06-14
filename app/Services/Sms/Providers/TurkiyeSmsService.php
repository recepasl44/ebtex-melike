<?php
namespace App\Services\Sms\Providers;

use GuzzleHttp\Client;
use App\Services\Sms\SmsServiceInterface;

class TurkiyeSmsService implements SmsServiceInterface
{
    protected $apiKey;
    protected $origin;

    public function __construct(array $config)
    {
        $this->apiKey = $config['api_key'] ?? null;
        $this->origin = $config['origin'] ?? null;
    }

    public function send(string $phone, string $message): bool|string
    {
        try {
            $client = new Client();
            $response = $client->post('https://api.turkeysms.com.tr/sms/send', [
                'json' => [
                    'api_key' => $this->apiKey,
                    'origin' => $this->origin,
                    'phone' => $phone,
                    'message' => $message,
                ],
            ]);
            $body = json_decode((string) $response->getBody(), true);

            if (!empty($body['success']) && $body['success'] === true) {
                return true;
            }
            return $body['message'] ?? 'Unknown error';
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}

<?php
namespace App\Services\Sms\Providers;

use App\Services\Sms\SmsServiceInterface;
use GuzzleHttp\Client;

class CorvassService implements SmsServiceInterface
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
            $response = $client->post('https://api.corvass.com/api/sms/send', [
                'headers' => [
                    'Authorization' => 'ApiKey ' . $this->apiKey,
                ],
                'json' => [
                    'origin' => $this->origin,
                    'phone' => $phone,
                    'message' => $message,
                ],
            ]);
            $body = json_decode((string) $response->getBody(), true);

            if (!empty($body['status']) && $body['status'] === 'OK') {
                return true;
            }
            return $body['message'] ?? 'Unknown error';
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}

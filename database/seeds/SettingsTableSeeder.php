<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (env('DB_CONNECTION') == 'mysql') {
            DB::table(config('access.settings_table'))->truncate();
        }

        $data = [

            [
                'seo_title' => env('APP_NAME'),
                'platform_id' => 1,
            ],
            [
                'seo_title' => env('APP_NAME'),
                'platform_id' => 2,
            ],
        ];

        DB::table(config('access.settings_table'))->insert($data);
    }
}

<?php

use App\Supports\Carbon as Carbon;
use Database\DisableForeignKeys;
use Database\TruncateTable;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Class RoleTableSeeder.
 */
class RoleTableSeeder extends Seeder
{
    use DisableForeignKeys, TruncateTable;

    /**
     * Run the database seed.
     *
     * @return void
     */
    public function run()
    {
        $this->disableForeignKeys();
        $this->truncate(config('access.roles_table'));

        $roles = [
            [
                'name'       => 'SuperAdmin',
                'all'        => true,
                'sort'       => 1,
                'created_by' => 1,
                'updated_by' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'deleted_at' => null,
                'platform_id'=> 1,
            ],
            [
                'name'       => 'Admin',
                'all'        => false,
                'sort'       => 2,
                'created_by' => 1,
                'updated_by' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'deleted_at' => null,
                'platform_id'=> 1,
            ],
            [
                'name'       => 'User',
                'all'        => false,
                'sort'       => 3,
                'created_by' => 1,
                'updated_by' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'deleted_at' => null,
                'platform_id'=> 1,
            ],
            [
                'name'       => 'SuperAdmin',
                'all'        => true,
                'sort'       => 1,
                'created_by' => 1,
                'updated_by' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'deleted_at' => null,
                'platform_id'=> 2,
            ],
            [
                'name'       => 'Admin',
                'all'        => false,
                'sort'       => 2,
                'created_by' => 1,
                'updated_by' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'deleted_at' => null,
                'platform_id'=> 2,
            ],
            [
                'name'       => 'User',
                'all'        => false,
                'sort'       => 3,
                'created_by' => 1,
                'updated_by' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
                'deleted_at' => null,
                'platform_id'=> 2,
            ],
        ];

        DB::table(config('access.roles_table'))->insert($roles);

        $this->enableForeignKeys();
    }
}

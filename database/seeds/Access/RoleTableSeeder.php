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
            // Application specific roles
            ['name' => 'Founding',        'all' => false, 'sort' => 10,  'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
            ['name' => 'CorporateLeader','all' => false, 'sort' => 20,  'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
            ['name' => 'Management',      'all' => false, 'sort' => 30,  'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
            ['name' => 'Teachers',        'all' => false, 'sort' => 40,  'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
            ['name' => 'PDR',             'all' => false, 'sort' => 50,  'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
            ['name' => 'StudentAffairs',  'all' => false, 'sort' => 60,  'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
            ['name' => 'FinanceOfficer',  'all' => false, 'sort' => 70,  'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
            ['name' => 'SupportStaff',    'all' => false, 'sort' => 80,  'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
            ['name' => 'SuerviceDriver',  'all' => false, 'sort' => 90,  'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
            ['name' => 'ServiceManager',  'all' => false, 'sort' => 100, 'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
            ['name' => 'ParentGuardian',  'all' => false, 'sort' => 110, 'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
            ['name' => 'Student',         'all' => false, 'sort' => 120, 'created_by' => 1, 'updated_by' => null, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'deleted_at' => null, 'platform_id' => 1],
        ];

        DB::table(config('access.roles_table'))->insert($roles);

        $this->enableForeignKeys();
    }
}

<?php

namespace App\Services\Access;

use Illuminate\Contracts\Auth\Authenticatable;

class Access
{
    /**
     * Guard ismi ('web' veya 'api')
     *
     * @var string
     */
    protected string $guard;

    public function __construct()
    {
        $this->guard = $this->detectGuard();
    }

    /**
     * İstek tipine göre guard seçimi yapar.
     * API istekleri için 'api', diğerleri için 'web' guard döner.
     *
     * @return string
     */
    protected function detectGuard()
    {
        // API rotaları genellikle 'api/*' prefix'li olur
        // veya JSON beklenen istekse api guard'ı kullan
        if (request()->expectsJson() || request()->is('api/*')) {
            return 'api';
        }

        return 'web';
    }

    /**
     * Doğru guard ile auth instance döner
     *
     * @return \Illuminate\Contracts\Auth\Guard|\Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function auth()
    {
        if($this->guard != 'web'){
            return auth();
        }
        return auth()->guard($this->guard);
    }

    /**
     * Şu anki kullanıcıyı döner
     *
     * @return \Illuminate\Contracts\Auth\Authenticatable|null
     */
    public function user()
    {
        return $this->auth()->user();
    }

    /**
     * Kullanıcı guest mi?
     *
     * @return bool
     */
    public function guest()
    {
        return $this->auth()->guest();
    }

    /**
     * Çıkış yapar
     */
    public function logout()
    {
        return $this->auth()->logout();
    }

    /**
     * Kullanıcı id'si
     *
     * @return int|string|null
     */
    public function id()
    {
        return $this->auth()->id();
    }

    /**
     * Kullanıcıyı login eder
     *
     * @param Authenticatable $user
     * @param bool $remember
     *
     * @return mixed
     */
    public function login(Authenticatable $user, $remember = false)
    {
        return $this->auth()->login($user, $remember);
    }

    /**
     * ID ile login yapar
     *
     * @param mixed $id
     *
     * @return mixed
     */
    public function loginUsingId($id)
    {
        return $this->auth()->loginUsingId($id);
    }

    /**
     * Rol kontrolü
     *
     * @param string|int $role
     *
     * @return bool
     */
    public function hasRole($role)
    {
        if ($user = $this->user()) {
            return $user->hasRole($role);
        }

        return false;
    }

    /**
     * Rolleri kontrol eder
     *
     * @param array|string $roles
     * @param bool $needsAll
     *
     * @return bool
     */
    public function hasRoles($roles, $needsAll = false)
    {
        if ($user = $this->user()) {
            return $user->hasRoles($roles, $needsAll);
        }

        return false;
    }

    /**
     * İzin kontrolü
     *
     * @param string|int $permissionQ
     *
     * @return bool
     */
    public function allow($permission)
    {
        if ($user = $this->user()) {
            return $user->allow($permission);
        }

        return false;
    }

    /**
     * Çoklu izin kontrolü
     *
     * @param array|string $permissions
     * @param bool $needsAll
     *
     * @return bool
     */
    public function allowMultiple($permissions, $needsAll = false)
    {
        if ($user = $this->user()) {
            return $user->allowMultiple($permissions, $needsAll);
        }

        return false;
    }

    /**
     * hasPermission alias'ı
     */
    public function hasPermission($permission)
    {
        return $this->allow($permission);
    }

    /**
     * hasPermissions alias'ı
     */
    public function hasPermissions($permissions, $needsAll = false)
    {
        return $this->allowMultiple($permissions, $needsAll);
    }
}

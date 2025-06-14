<?php

namespace App\Models\Access\User\Traits\Attribute;

/**
 * Class UserAttribute.
 */
trait UserAttribute
{
    /**
     * @return mixed
     */
    public function canChangeEmail()
    {
        return config('access.users.change_email');
    }

    /**
     * @return bool
     */
    public function canChangePassword()
    {
        return !app('session')->has(config('access.socialite_session_name'));
    }

    /**
     * @return string
     */
    public function getStatusLabelAttribute()
    {
        if ($this->isActive()) {
            return "<label class='badge bg-outline-success'>"._tr('labels.general.active').'</label>';
        }

        return "<label class='badge bg-outline-danger'>"._tr('labels.general.inactive').'</label>';
    }

    /**
     * @return string
     */
    public function getConfirmedLabelAttribute()
    {
        if ($this->isConfirmed()) {
            return "<label class='badge bg-outline-success'>"._tr('labels.general.yes').'</label>';
        }

        return "<label class='badge bg-outline-danger'>"._tr('labels.general.no').'</label>';
    }

    /**
     * @return mixed
     */
    public function getPictureAttribute()
    {
        return $this->getPicture();
    }

    /**
     * @param bool $size
     *
     * @return mixed
     */
    public function getPicture($size = false)
    {
        if (!$size) {
            $size = config('gravatar.default.size');
        }

        return gravatar()->get($this->email, ['size' => $size]);
    }

    /**
     * @param $provider
     *
     * @return bool
     */
    public function hasProvider($provider)
    {
        foreach ($this->providers as $p) {
            if ($p->provider == $provider) {
                return true;
            }
        }

        return false;
    }

    /**
     * @return bool
     */
    public function isActive()
    {
        return $this->status == 1;
    }

    /**
     * @return bool
     */
    public function isConfirmed()
    {
        return $this->confirmed == 1;
    }

    /**
     * @return string
     */
    public function getShowButtonAttribute($class)
    {
        if (access()->allow('show-user')) {
            return '<a class="'.$class.'" href="'.route('admin.access.user.show', $this).'">
                    <i data-toggle="tooltip" data-placement="top" title="'._tr('view').'" class="bi bi-eye"></i>
                </a>';
        }
    }

    /**
     * @return string
     */
    public function getEditButtonAttribute($class)
    {
        if (access()->allow('edit-user')) {
            return '<a class="'.$class.'" href="'.route('admin.access.user.edit', $this).'">
                    <i data-toggle="tooltip" data-placement="top" title="'._tr('edit').'" class="ri-edit-line"></i>
                </a>';
        }
    }
    /**
     * @return string
     */
    public function getStatisticsButtonAttribute($class)
    {
        if (access()->allow('show-user')) {
            return '<a class="'.$class.'" href="'.route('admin.statistics.users', $this).'">
                    <i data-toggle="tooltip" data-placement="top" title="'._tr('edit').'" class="bi bi-graph-up-arrow"></i>
                </a>';
        }
    }

    /**
     * @return string
     */
    public function getChangePasswordButtonAttribute($class)
    {
        if (access()->user()->id == $this->id && access()->allow('edit-user')) {
            return '<a class="'.$class.'" href="'.route('admin.access.user.change-password', $this).'">
                        <i class="bi bi-arrow-repeat" data-toggle="tooltip" data-placement="top" title="'._tr('buttons.backend.access.users.change_password').'">
                        </i>
                    </a>';
        }
    }

    /**
     * @return string
     */
    public function getStatusButtonAttribute($class)
    {
        if ($this->id != access()->id()) {
            switch ($this->status) {
                case 0:
                    if (access()->allow('activate-user')) {
                        $name = !str_contains($class, 'btn') ? _tr('activate') : '';

                        return '<a class="'.$class.'" href="'.route('admin.access.user.mark', [$this, 1]).'"><i class="bi bi-check-square" data-toggle="tooltip" data-placement="top" title="'._tr('buttons.backend.access.users.activate').'"></i> '.$name.'</a>';
                    }

                    break;

                case 1:
                    if (access()->allow('deactivate-user')) {
                        $name = (!str_contains($class, 'btn')) ? _tr('deactivate') : '';

                        return '<a class="'.$class.'" href="'.route('admin.access.user.mark', [$this, 0]).'"><i class="bi bi-square" data-toggle="tooltip" data-placement="top" title="'._tr('buttons.backend.access.users.deactivate').'"></i> '.$name.'</a>';
                    }

                    break;

                default:
                    return '';
            }
        }

        return '';
    }

    /**
     * @return string
     */
    public function getConfirmedButtonAttribute($class)
    {
        if (!$this->isConfirmed() && access()->allow('edit-user')) {
            return '<a class="'.$class.'" href="'.route('admin.access.user.account.confirm.resend', $this).'"><i class="bi bi-arrow-repeat" data-toggle="tooltip" data-placement="top" title='._tr('buttons.backend.access.users.resend_email').'"></i></a> ';
        }

        return '';
    }

    /**
     * @return string
     */
    public function getDeleteButtonAttribute($class)
    {
        if ($this->id != access()->id() && access()->allow('delete-user')) {
            $name = !str_contains($class, 'btn') ? _tr('delete') : '';

            return '<a class="'.$class.'" href="'.route('admin.access.user.destroy', $this).'"
                 data-method="delete"
                 data-trans-button-cancel="'._tr('buttons.general.cancel').'"
                 data-trans-button-confirm="'._tr('buttons.general.crud.delete').'"
                 data-trans-title="'._tr('strings.backend.general.are_you_sure').'"><i class="ri-delete-bin-5-line" data-toggle="tooltip" data-placement="top" title="'._tr('buttons.general.crud.delete').'"></i> '.$name.'</a>';
        }

        return '';
    }

    /**
     * @return string
     */
    public function getRestoreButtonAttribute($class)
    {
        if (access()->allow('delete-user')) {
            return '<a class="'.$class.'" href="'.route('admin.access.user.restore', $this).'" name="restore_user"><i class="bi bi-arrow-repeat" data-toggle="tooltip" data-placement="top" title="'._tr('buttons.backend.access.users.restore_user').'"></i></a> ';
        }
    }

    /**
     * @return string
     */
    public function getDeletePermanentlyButtonAttribute($class)
    {
        return '<a class="'.$class.'" href="'.route('admin.access.user.delete-permanently', $this).'" name="delete_user_perm"><i class="bi bi-trash" data-toggle="tooltip" data-placement="top" title="'._tr('buttons.backend.access.users.delete_permanently').'"></i></a> ';
    }

    /**
     * @return string
     */
    public function getLoginAsButtonAttribute($class)
    {
        $name = !str_contains($class, 'btn') ? _tr('login_as') : '';
        /*
         * If the admin is currently NOT spoofing a user
         */
        if (access()->allow('login-as-user') && (!session()->has('admin_user_id') || !session()->has('temp_user_id'))) {
            //Won't break, but don't let them "Login As" themselves
            if ($this->id != access()->id()) {
                return '<a class="'.$class.'" href="'.route(
                    'admin.access.user.login-as',
                    $this
                ).'"><i class="bi bi-lock" data-toggle="tooltip" data-placement="top" title="'._tr(
                        'buttons.backend.access.users.login_as',
                        ['user' => $this->name]
                    ).'"></i> '.$name.'</a>';
            }
        }

        return '';
    }

    /**
     * @return string
     */
    public function getClearSessionButtonAttribute($class)
    {
        $name = !str_contains($class, 'btn') ? _tr('clear-session') : '';

        if ($this->id != access()->id() && config('session.driver') == 'database' && access()->allow('clear-user-session')) {
            return '<a class="'.$class.'" href="'.route('admin.access.user.clear-session', $this).'"
			 	 data-trans-button-cancel="'._tr('buttons.general.cancel').'"
                 data-trans-button-confirm="'._tr('buttons.general.continue').'"
                 data-trans-title="'._tr('strings.backend.general.are_you_sure').'"
                 name="confirm_item"><i class="bi bi-times" data-toggle="tooltip" data-placement="top" title="'._tr('buttons.backend.access.users.clear_session').'"></i>'.$name.'</a>';
        }

        return '';
    }

    public function checkAdmin()
    {
        if ($this->id != 1) {
            return '<div class="btn-group">
                        <button type="button" class="btn btn-icon rounded-pill btn-sm btn-danger-light" data-bs-toggle="dropdown">
                            <span class="bi bi-three-dots-vertical"></span>
                        </button>
                        
                        <ul class="dropdown-menu dropdown-menu-end" style="position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 21px);" data-popper-placement="bottom-end">
                            <li>'.$this->getStatusButtonAttribute('dropdown-item').'</li>
                            <li>'.$this->getClearSessionButtonAttribute('dropdown-item').'</li>
                            <li>'.$this->getDeleteButtonAttribute('dropdown-item').'</li>
                            <li>'.$this->getLoginAsButtonAttribute('dropdown-item').'</li>
                        </ul>
                    </div>';
        }
    }

    /**
     * Get logged in user permission related to user management grid.
     *
     * @return array
     */
    public function getUserPermission()
    {
        $userPermission = [];
        $attributePermission = ['8', '10', '11', '12', '13', '14', '15'];
        foreach (access()->user()->permissions as $permission) {
            if (in_array($permission->id, $attributePermission)) {
                $userPermission[] = $permission->name;
            }
        }

        return $userPermission;
    }

    /**
     * Get action button attribute by permission name.
     *
     * @param string $permissionName
     * @param int    $counter
     *
     * @return string
     */
    public function getActionButtonsByPermissionName($permissionName, $counter)
    {
        // check if counter is less then 3 then apply button client
        $class = ($counter <= 3) ? 'btn btn-icon rounded-pill btn-sm btn-primary-light' : '';

        switch ($permissionName) {
            case 'show-user':
                $button = ($counter <= 3) ? $this->getShowButtonAttribute($class) : '<li>'
                    .$this->getShowButtonAttribute($class).
                    '</li>';
                $button .= ($counter <= 3) ? $this->getStatisticsButtonAttribute($class) : '<li>'
                    .$this->getStatisticsButtonAttribute($class).
                    '</li>';

                break;
            case 'edit-user':
                $button = ($counter <= 3) ? $this->getEditButtonAttribute($class) : '<li>'
                    .$this->getEditButtonAttribute($class).
                    '</li>';
                $button .= ($counter <= 3) ? $this->getChangePasswordButtonAttribute($class) : '<li>'
                    .$this->getChangePasswordButtonAttribute($class).
                    '</li>';

                break;
            case 'activate-user':
                if (\Route::currentRouteName() == 'admin.access.user.deactivated.get') {
                    $button = ($counter <= 3) ? $this->getStatusButtonAttribute($class) : '<li>'
                    .$this->getStatusButtonAttribute($class).
                    '</li>';
                } else {
                    $button = '';
                }

                break;
            case 'deactivate-user':
                if (\Route::currentRouteName() == 'admin.access.user.get') {
                    $button = ($counter <= 3) ? $this->getStatusButtonAttribute($class) : '<li>'
                    .$this->getStatusButtonAttribute($class).
                    '</li>';
                } else {
                    $button = '';
                }

                break;
            case 'delete-user':
                if (access()->user()->id != $this->id) {
                    $button = ($counter <= 3) ? $this->getDeleteButtonAttribute($class) : '<li>'
                        .$this->getDeleteButtonAttribute($class).
                        '</li>';
                } else {
                    $button = '';
                }

                break;
            case 'login-as-user':
                if (access()->user()->id != $this->id) {
                    $button = ($counter <= 3) ? $this->getLoginAsButtonAttribute($class) : '<li>'
                        .$this->getLoginAsButtonAttribute($class).
                        '</li>';
                } else {
                    $button = '';
                }

                break;
            case 'clear-user-session':
                if (access()->user()->id != $this->id) {
                    $button = ($counter <= 3) ? $this->getClearSessionButtonAttribute($class) : '<li>'
                        .$this->getClearSessionButtonAttribute($class).
                        '</li>';
                } else {
                    $button = '';
                }

                break;
            default:
                $button = '';

                break;
        }

        return $button;
    }

    public function getNameAttribute()
    {
        return $this->first_name.' '.$this->last_name;
    }

    /**
     * @return string
     */
    public function getActionButtonsAttribute()
    {
        if ($this->trashed()) {
            return '<div class="btn-list">
                        '.$this->getRestoreButtonAttribute('btn btn-outline-primary').'
                        '.$this->getDeletePermanentlyButtonAttribute('btn btn-outline-primary').'
                    </div>';
        }

        // Check if role have all permission
        if (access()->user()->roles[0]->all) {
            return '<div class="btn-list">
                    '.$this->getShowButtonAttribute('btn btn-icon rounded-pill btn-sm btn-primary-light').'
                    '.$this->getEditButtonAttribute('btn btn-icon rounded-pill btn-sm btn-info-light').'
                    '.$this->getChangePasswordButtonAttribute('btn btn-icon rounded-pill btn-sm btn-warning-light').'
                    '.$this->checkAdmin().'
                </div>';

            //'.$this->getStatisticsButtonAttribute('btn btn-outline-warning').'
        } else {
            $userPermission = $this->getUserPermission();
            $permissionCounter = count($userPermission);
            $actionButton = '<div class="btn-list">';
            $i = 1;

            if (access()->user()->id == $this->id) {
                if (in_array('clear-user-session', $userPermission)) {
                    $permissionCounter = $permissionCounter - 1;
                }

                if (in_array('login-as-user', $userPermission)) {
                    $permissionCounter = $permissionCounter - 1;
                }

                if (in_array('delete-user', $userPermission)) {
                    $permissionCounter = $permissionCounter - 1;
                }

                if (in_array('deactivate-user', $userPermission)) {
                    $permissionCounter = $permissionCounter - 1;
                }
            }

            foreach ($userPermission as $value) {
                if ($i != 3) {
                    $actionButton = $actionButton.''.$this->getActionButtonsByPermissionName($value, $i);
                }

                if ($i == 3) {
                    $actionButton = $actionButton.''.$this->getActionButtonsByPermissionName($value, $i);

                    if ($permissionCounter > 3) {
                        $actionButton = $actionButton.'
                            <div class="btn-group dropup">
                            <button type="button" class="btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
                                <span class="bi bi-three-dots-vertical"></span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-right">';
                    }
                }
                $i++;
            }
            $actionButton .= '</ul></div></div>';

            return $actionButton;
        }
    }
}

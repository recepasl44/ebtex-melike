<?php

Breadcrumbs::register('admin.settings.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.settings.edit'), route('admin.settings.edit', $id));
});

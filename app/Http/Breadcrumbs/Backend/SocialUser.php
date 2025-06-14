<?php

Breadcrumbs::register('admin.socialusers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.socialusers_management'), route('admin.socialusers.index'));
});

Breadcrumbs::register('admin.socialusers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.socialusers.index');
    $breadcrumbs->push(_tr('menus.backend.socialusers.create'), route('admin.socialusers.create'));
});

Breadcrumbs::register('admin.socialusers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.socialusers.index');
    $breadcrumbs->push(_tr('menus.backend.socialusers.edit'), route('admin.socialusers.edit', $id));
});

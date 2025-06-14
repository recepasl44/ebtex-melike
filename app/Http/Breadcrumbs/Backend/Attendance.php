<?php

Breadcrumbs::register('admin.attendances.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.attendances.management'), route('admin.attendances.index'));
});

Breadcrumbs::register('admin.attendances.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.attendances.index');
    $breadcrumbs->push(_tr('menus.backend.attendances.create'), route('admin.attendances.create'));
});

Breadcrumbs::register('admin.attendances.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.attendances.index');
    $breadcrumbs->push(_tr('menus.backend.attendances.edit'), route('admin.attendances.edit', $id));
});

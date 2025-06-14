<?php

Breadcrumbs::register('admin.schooltypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.schooltypes.management'), route('admin.schooltypes.index'));
});

Breadcrumbs::register('admin.schooltypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.schooltypes.index');
    $breadcrumbs->push(_tr('menus.backend.schooltypes.create'), route('admin.schooltypes.create'));
});

Breadcrumbs::register('admin.schooltypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.schooltypes.index');
    $breadcrumbs->push(_tr('menus.backend.schooltypes.edit'), route('admin.schooltypes.edit', $id));
});

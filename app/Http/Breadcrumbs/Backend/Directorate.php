<?php

Breadcrumbs::register('admin.directorates.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.directorates.management'), route('admin.directorates.index'));
});

Breadcrumbs::register('admin.directorates.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.directorates.index');
    $breadcrumbs->push(_tr('menus.backend.directorates.create'), route('admin.directorates.create'));
});

Breadcrumbs::register('admin.directorates.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.directorates.index');
    $breadcrumbs->push(_tr('menus.backend.directorates.edit'), route('admin.directorates.edit', $id));
});

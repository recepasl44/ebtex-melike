<?php

Breadcrumbs::register('admin.taskstatuses.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.taskstatuses.management'), route('admin.taskstatuses.index'));
});

Breadcrumbs::register('admin.taskstatuses.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.taskstatuses.index');
    $breadcrumbs->push(_tr('menus.backend.taskstatuses.create'), route('admin.taskstatuses.create'));
});

Breadcrumbs::register('admin.taskstatuses.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.taskstatuses.index');
    $breadcrumbs->push(_tr('menus.backend.taskstatuses.edit'), route('admin.taskstatuses.edit', $id));
});

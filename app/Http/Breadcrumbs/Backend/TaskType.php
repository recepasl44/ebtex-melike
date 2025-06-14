<?php

Breadcrumbs::register('admin.tasktypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.tasktypes.management'), route('admin.tasktypes.index'));
});

Breadcrumbs::register('admin.tasktypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.tasktypes.index');
    $breadcrumbs->push(_tr('menus.backend.tasktypes.create'), route('admin.tasktypes.create'));
});

Breadcrumbs::register('admin.tasktypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.tasktypes.index');
    $breadcrumbs->push(_tr('menus.backend.tasktypes.edit'), route('admin.tasktypes.edit', $id));
});

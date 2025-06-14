<?php

Breadcrumbs::register('admin.levels.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.levels.management'), route('admin.levels.index'));
});

Breadcrumbs::register('admin.levels.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.levels.index');
    $breadcrumbs->push(_tr('menus.backend.levels.create'), route('admin.levels.create'));
});

Breadcrumbs::register('admin.levels.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.levels.index');
    $breadcrumbs->push(_tr('menus.backend.levels.edit'), route('admin.levels.edit', $id));
});

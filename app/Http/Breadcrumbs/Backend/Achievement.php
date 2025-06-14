<?php

Breadcrumbs::register('admin.achievements.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.achievements.management'), route('admin.achievements.index'));
});

Breadcrumbs::register('admin.achievements.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.achievements.index');
    $breadcrumbs->push(_tr('menus.backend.achievements.create'), route('admin.achievements.create'));
});

Breadcrumbs::register('admin.achievements.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.achievements.index');
    $breadcrumbs->push(_tr('menus.backend.achievements.edit'), route('admin.achievements.edit', $id));
});

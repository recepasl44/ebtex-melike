<?php

Breadcrumbs::register('admin.colors.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.colors_management'), route('admin.colors.index'));
});

Breadcrumbs::register('admin.colors.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.colors.index');
    $breadcrumbs->push(_tr('menus.backend.colors.create'), route('admin.colors.create'));
});

Breadcrumbs::register('admin.colors.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.colors.index');
    $breadcrumbs->push(_tr('menus.backend.colors.edit'), route('admin.colors.edit', $id));
});

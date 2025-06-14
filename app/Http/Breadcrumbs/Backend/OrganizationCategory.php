<?php

Breadcrumbs::register('admin.organizationcategories.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.organizationcategories_management'), route('admin.organizationcategories.index'));
});

Breadcrumbs::register('admin.organizationcategories.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.organizationcategories.index');
    $breadcrumbs->push(_tr('menus.backend.organizationcategories.create'), route('admin.organizationcategories.create'));
});

Breadcrumbs::register('admin.organizationcategories.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.organizationcategories.index');
    $breadcrumbs->push(_tr('menus.backend.organizationcategories.edit'), route('admin.organizationcategories.edit', $id));
});

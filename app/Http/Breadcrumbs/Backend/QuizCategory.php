<?php

Breadcrumbs::register('admin.quizcategories.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizcategories.management'), route('admin.quizcategories.index'));
});

Breadcrumbs::register('admin.quizcategories.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizcategories.index');
    $breadcrumbs->push(_tr('menus.backend.quizcategories.create'), route('admin.quizcategories.create'));
});

Breadcrumbs::register('admin.quizcategories.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizcategories.index');
    $breadcrumbs->push(_tr('menus.backend.quizcategories.edit'), route('admin.quizcategories.edit', $id));
});

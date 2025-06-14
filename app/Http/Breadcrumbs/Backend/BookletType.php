<?php

Breadcrumbs::register('admin.booklettypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.booklettypes.management'), route('admin.booklettypes.index'));
});

Breadcrumbs::register('admin.booklettypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.booklettypes.index');
    $breadcrumbs->push(_tr('menus.backend.booklettypes.create'), route('admin.booklettypes.create'));
});

Breadcrumbs::register('admin.booklettypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.booklettypes.index');
    $breadcrumbs->push(_tr('menus.backend.booklettypes.edit'), route('admin.booklettypes.edit', $id));
});

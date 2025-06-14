<?php

Breadcrumbs::register('admin.fieldmanagers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.fieldmanagers.management'), route('admin.fieldmanagers.index'));
});

Breadcrumbs::register('admin.fieldmanagers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.fieldmanagers.index');
    $breadcrumbs->push(_tr('menus.backend.fieldmanagers.create'), route('admin.fieldmanagers.create'));
});

Breadcrumbs::register('admin.fieldmanagers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.fieldmanagers.index');
    $breadcrumbs->push(_tr('menus.backend.fieldmanagers.edit'), route('admin.fieldmanagers.edit', $id));
});

<?php

Breadcrumbs::register('admin.agreements.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.agreements.management'), route('admin.agreements.index'));
});

Breadcrumbs::register('admin.agreements.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.agreements.index');
    $breadcrumbs->push(_tr('menus.backend.agreements.create'), route('admin.agreements.create'));
});

Breadcrumbs::register('admin.agreements.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.agreements.index');
    $breadcrumbs->push(_tr('menus.backend.agreements.edit'), route('admin.agreements.edit', $id));
});

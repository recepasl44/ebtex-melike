<?php

Breadcrumbs::register('admin.guardians.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.guardians.management'), route('admin.guardians.index'));
});

Breadcrumbs::register('admin.guardians.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.guardians.index');
    $breadcrumbs->push(_tr('menus.backend.guardians.create'), route('admin.guardians.create'));
});

Breadcrumbs::register('admin.guardians.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.guardians.index');
    $breadcrumbs->push(_tr('menus.backend.guardians.edit'), route('admin.guardians.edit', $id));
});

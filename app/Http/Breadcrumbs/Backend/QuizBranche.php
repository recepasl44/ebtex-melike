<?php

Breadcrumbs::register('admin.quizbranches.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizbranches.management'), route('admin.quizbranches.index'));
});

Breadcrumbs::register('admin.quizbranches.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizbranches.index');
    $breadcrumbs->push(_tr('menus.backend.quizbranches.create'), route('admin.quizbranches.create'));
});

Breadcrumbs::register('admin.quizbranches.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizbranches.index');
    $breadcrumbs->push(_tr('menus.backend.quizbranches.edit'), route('admin.quizbranches.edit', $id));
});

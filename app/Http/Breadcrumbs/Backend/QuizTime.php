<?php

Breadcrumbs::register('admin.quiztimes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quiztimes.management'), route('admin.quiztimes.index'));
});

Breadcrumbs::register('admin.quiztimes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quiztimes.index');
    $breadcrumbs->push(_tr('menus.backend.quiztimes.create'), route('admin.quiztimes.create'));
});

Breadcrumbs::register('admin.quiztimes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quiztimes.index');
    $breadcrumbs->push(_tr('menus.backend.quiztimes.edit'), route('admin.quiztimes.edit', $id));
});

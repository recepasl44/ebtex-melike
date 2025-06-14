<?php

Breadcrumbs::register('admin.quiztypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quiztypes.management'), route('admin.quiztypes.index'));
});

Breadcrumbs::register('admin.quiztypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quiztypes.index');
    $breadcrumbs->push(_tr('menus.backend.quiztypes.create'), route('admin.quiztypes.create'));
});

Breadcrumbs::register('admin.quiztypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quiztypes.index');
    $breadcrumbs->push(_tr('menus.backend.quiztypes.edit'), route('admin.quiztypes.edit', $id));
});

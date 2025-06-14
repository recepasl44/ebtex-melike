<?php

Breadcrumbs::register('admin.references.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.references_management'), route('admin.references.index'));
});

Breadcrumbs::register('admin.references.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.references.index');
    $breadcrumbs->push(_tr('menus.backend.references.create'), route('admin.references.create'));
});

Breadcrumbs::register('admin.references.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.references.index');
    $breadcrumbs->push(_tr('menus.backend.references.edit'), route('admin.references.edit', $id));
});

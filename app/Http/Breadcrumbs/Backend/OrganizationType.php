<?php

Breadcrumbs::register('admin.organizationtypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.organizationtypes_management'), route('admin.organizationtypes.index'));
});

Breadcrumbs::register('admin.organizationtypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.organizationtypes.index');
    $breadcrumbs->push(_tr('menus.backend.organizationtypes.create'), route('admin.organizationtypes.create'));
});

Breadcrumbs::register('admin.organizationtypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.organizationtypes.index');
    $breadcrumbs->push(_tr('menus.backend.organizationtypes.edit'), route('admin.organizationtypes.edit', $id));
});

<?php

Breadcrumbs::register('admin.workshops.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.workshops_management'), route('admin.workshops.index'));
});

Breadcrumbs::register('admin.workshops.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.workshops.index');
    $breadcrumbs->push(_tr('menus.backend.workshops.create'), route('admin.workshops.create'));
});

Breadcrumbs::register('admin.workshops.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.workshops.index');
    $breadcrumbs->push(_tr('menus.backend.workshops.edit'), route('admin.workshops.edit', $id));
});

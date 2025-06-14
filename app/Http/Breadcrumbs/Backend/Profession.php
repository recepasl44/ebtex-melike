<?php

Breadcrumbs::register('admin.professions.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.professions.management'), route('admin.professions.index'));
});

Breadcrumbs::register('admin.professions.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.professions.index');
    $breadcrumbs->push(_tr('menus.backend.professions.create'), route('admin.professions.create'));
});

Breadcrumbs::register('admin.professions.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.professions.index');
    $breadcrumbs->push(_tr('menus.backend.professions.edit'), route('admin.professions.edit', $id));
});

<?php

Breadcrumbs::register('admin.quizsessions.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.quizsessions.management'), route('admin.quizsessions.index'));
});

Breadcrumbs::register('admin.quizsessions.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.quizsessions.index');
    $breadcrumbs->push(_tr('menus.backend.quizsessions.create'), route('admin.quizsessions.create'));
});

Breadcrumbs::register('admin.quizsessions.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.quizsessions.index');
    $breadcrumbs->push(_tr('menus.backend.quizsessions.edit'), route('admin.quizsessions.edit', $id));
});

<?php

Breadcrumbs::register('admin.discountstudents.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.discountstudents.management'), route('admin.discountstudents.index'));
});

Breadcrumbs::register('admin.discountstudents.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.discountstudents.index');
    $breadcrumbs->push(_tr('menus.backend.discountstudents.create'), route('admin.discountstudents.create'));
});

Breadcrumbs::register('admin.discountstudents.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.discountstudents.index');
    $breadcrumbs->push(_tr('menus.backend.discountstudents.edit'), route('admin.discountstudents.edit', $id));
});

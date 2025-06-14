<?php

Breadcrumbs::register('admin.institutions.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.institutions.management'), route('admin.institutions.index'));
});

Breadcrumbs::register('admin.institutions.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.institutions.index');
    $breadcrumbs->push(_tr('menus.backend.institutions.create'), route('admin.institutions.create'));
});

Breadcrumbs::register('admin.institutions.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.institutions.index');
    $breadcrumbs->push(_tr('menus.backend.institutions.edit'), route('admin.institutions.edit', $id));
});

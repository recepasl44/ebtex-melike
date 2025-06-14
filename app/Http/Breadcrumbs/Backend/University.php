<?php

Breadcrumbs::register('admin.universities.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.universities_management'), route('admin.universities.index'));
});

Breadcrumbs::register('admin.universities.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.universities.index');
    $breadcrumbs->push(_tr('menus.backend.universities.create'), route('admin.universities.create'));
});

Breadcrumbs::register('admin.universities.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.universities.index');
    $breadcrumbs->push(_tr('menus.backend.universities.edit'), route('admin.universities.edit', $id));
});

<?php

Breadcrumbs::register('admin.enrollments.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.enrollments.management'), route('admin.enrollments.index'));
});

Breadcrumbs::register('admin.enrollments.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.enrollments.index');
    $breadcrumbs->push(_tr('menus.backend.enrollments.create'), route('admin.enrollments.create'));
});

Breadcrumbs::register('admin.enrollments.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.enrollments.index');
    $breadcrumbs->push(_tr('menus.backend.enrollments.edit'), route('admin.enrollments.edit', $id));
});

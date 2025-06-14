<?php

Breadcrumbs::register('admin.attendancestudents.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.attendancestudents.management'), route('admin.attendancestudents.index'));
});

Breadcrumbs::register('admin.attendancestudents.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.attendancestudents.index');
    $breadcrumbs->push(_tr('menus.backend.attendancestudents.create'), route('admin.attendancestudents.create'));
});

Breadcrumbs::register('admin.attendancestudents.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.attendancestudents.index');
    $breadcrumbs->push(_tr('menus.backend.attendancestudents.edit'), route('admin.attendancestudents.edit', $id));
});

<?php

Breadcrumbs::register('admin.studentgroups.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.studentgroups.management'), route('admin.studentgroups.index'));
});

Breadcrumbs::register('admin.studentgroups.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.studentgroups.index');
    $breadcrumbs->push(_tr('menus.backend.studentgroups.create'), route('admin.studentgroups.create'));
});

Breadcrumbs::register('admin.studentgroups.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.studentgroups.index');
    $breadcrumbs->push(_tr('menus.backend.studentgroups.edit'), route('admin.studentgroups.edit', $id));
});

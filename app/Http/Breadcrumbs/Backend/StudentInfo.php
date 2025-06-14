<?php

Breadcrumbs::register('admin.studentinfos.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.studentinfos.management'), route('admin.studentinfos.index'));
});

Breadcrumbs::register('admin.studentinfos.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.studentinfos.index');
    $breadcrumbs->push(_tr('menus.backend.studentinfos.create'), route('admin.studentinfos.create'));
});

Breadcrumbs::register('admin.studentinfos.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.studentinfos.index');
    $breadcrumbs->push(_tr('menus.backend.studentinfos.edit'), route('admin.studentinfos.edit', $id));
});

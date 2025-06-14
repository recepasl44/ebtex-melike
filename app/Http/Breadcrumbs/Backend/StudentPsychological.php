<?php

Breadcrumbs::register('admin.studentpsychologicals.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.studentpsychologicals.management'), route('admin.studentpsychologicals.index'));
});

Breadcrumbs::register('admin.studentpsychologicals.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.studentpsychologicals.index');
    $breadcrumbs->push(_tr('menus.backend.studentpsychologicals.create'), route('admin.studentpsychologicals.create'));
});

Breadcrumbs::register('admin.studentpsychologicals.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.studentpsychologicals.index');
    $breadcrumbs->push(_tr('menus.backend.studentpsychologicals.edit'), route('admin.studentpsychologicals.edit', $id));
});

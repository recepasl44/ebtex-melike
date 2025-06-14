<?php

Breadcrumbs::register('admin.reports.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.reports_management'), route('admin.reports.index'));
});

Breadcrumbs::register('admin.reports.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.reports.index');
    $breadcrumbs->push(_tr('menus.backend.reports.create'), route('admin.reports.create'));
});

Breadcrumbs::register('admin.reports.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.reports.index');
    $breadcrumbs->push(_tr('menus.backend.reports.edit'), route('admin.reports.edit', $id));
});

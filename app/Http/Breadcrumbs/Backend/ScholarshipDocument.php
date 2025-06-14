<?php

Breadcrumbs::register('admin.scholarshipdocuments.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.scholarshipdocuments.management'), route('admin.scholarshipdocuments.index'));
});

Breadcrumbs::register('admin.scholarshipdocuments.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.scholarshipdocuments.index');
    $breadcrumbs->push(_tr('menus.backend.scholarshipdocuments.create'), route('admin.scholarshipdocuments.create'));
});

Breadcrumbs::register('admin.scholarshipdocuments.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.scholarshipdocuments.index');
    $breadcrumbs->push(_tr('menus.backend.scholarshipdocuments.edit'), route('admin.scholarshipdocuments.edit', $id));
});

<?php

Breadcrumbs::register('admin.scholarshipapplications.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.scholarshipapplications.management'), route('admin.scholarshipapplications.index'));
});

Breadcrumbs::register('admin.scholarshipapplications.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.scholarshipapplications.index');
    $breadcrumbs->push(_tr('menus.backend.scholarshipapplications.create'), route('admin.scholarshipapplications.create'));
});

Breadcrumbs::register('admin.scholarshipapplications.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.scholarshipapplications.index');
    $breadcrumbs->push(_tr('menus.backend.scholarshipapplications.edit'), route('admin.scholarshipapplications.edit', $id));
});

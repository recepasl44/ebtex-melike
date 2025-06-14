<?php

Breadcrumbs::register('admin.annualplans.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.annualplans.management'), route('admin.annualplans.index'));
});

Breadcrumbs::register('admin.annualplans.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.annualplans.index');
    $breadcrumbs->push(_tr('menus.backend.annualplans.create'), route('admin.annualplans.create'));
});

Breadcrumbs::register('admin.annualplans.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.annualplans.index');
    $breadcrumbs->push(_tr('menus.backend.annualplans.edit'), route('admin.annualplans.edit', $id));
});

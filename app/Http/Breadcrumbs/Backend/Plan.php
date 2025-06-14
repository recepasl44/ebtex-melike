<?php

Breadcrumbs::register('admin.plans.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.plans_management'), route('admin.plans.index'));
});

Breadcrumbs::register('admin.plans.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.plans.index');
    $breadcrumbs->push(_tr('menus.backend.plans.create'), route('admin.plans.create'));
});

Breadcrumbs::register('admin.plans.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.plans.index');
    $breadcrumbs->push(_tr('menus.backend.plans.edit'), route('admin.plans.edit', $id));
});

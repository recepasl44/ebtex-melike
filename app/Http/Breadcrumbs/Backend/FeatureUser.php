<?php

Breadcrumbs::register('admin.featureusers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.featureusers_management'), route('admin.featureusers.index'));
});

Breadcrumbs::register('admin.featureusers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.featureusers.index');
    $breadcrumbs->push(_tr('menus.backend.featureusers.create'), route('admin.featureusers.create'));
});

Breadcrumbs::register('admin.featureusers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.featureusers.index');
    $breadcrumbs->push(_tr('menus.backend.featureusers.edit'), route('admin.featureusers.edit', $id));
});

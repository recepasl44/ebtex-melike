<?php

Breadcrumbs::register('admin.discounts.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.discounts.management'), route('admin.discounts.index'));
});

Breadcrumbs::register('admin.discounts.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.discounts.index');
    $breadcrumbs->push(_tr('menus.backend.discounts.create'), route('admin.discounts.create'));
});

Breadcrumbs::register('admin.discounts.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.discounts.index');
    $breadcrumbs->push(_tr('menus.backend.discounts.edit'), route('admin.discounts.edit', $id));
});

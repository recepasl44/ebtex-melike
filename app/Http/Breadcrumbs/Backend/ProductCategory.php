<?php

Breadcrumbs::register('admin.productcategories.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.productcategories_management'), route('admin.productcategories.index'));
});

Breadcrumbs::register('admin.productcategories.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.productcategories.index');
    $breadcrumbs->push(_tr('menus.backend.productcategories.create'), route('admin.productcategories.create'));
});

Breadcrumbs::register('admin.productcategories.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.productcategories.index');
    $breadcrumbs->push(_tr('menus.backend.productcategories.edit'), route('admin.productcategories.edit', $id));
});

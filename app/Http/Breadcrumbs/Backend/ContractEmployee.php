<?php

Breadcrumbs::register('admin.contractemployees.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.contractemployees.management'), route('admin.contractemployees.index'));
});

Breadcrumbs::register('admin.contractemployees.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.contractemployees.index');
    $breadcrumbs->push(_tr('menus.backend.contractemployees.create'), route('admin.contractemployees.create'));
});

Breadcrumbs::register('admin.contractemployees.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.contractemployees.index');
    $breadcrumbs->push(_tr('menus.backend.contractemployees.edit'), route('admin.contractemployees.edit', $id));
});

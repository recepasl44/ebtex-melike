<?php

Breadcrumbs::register('admin.weightindices.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.weightindices.management'), route('admin.weightindices.index'));
});

Breadcrumbs::register('admin.weightindices.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.weightindices.index');
    $breadcrumbs->push(_tr('menus.backend.weightindices.create'), route('admin.weightindices.create'));
});

Breadcrumbs::register('admin.weightindices.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.weightindices.index');
    $breadcrumbs->push(_tr('menus.backend.weightindices.edit'), route('admin.weightindices.edit', $id));
});

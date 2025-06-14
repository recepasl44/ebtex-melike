<?php

Breadcrumbs::register('admin.scolarshipassigns.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.scolarshipassigns.management'), route('admin.scolarshipassigns.index'));
});

Breadcrumbs::register('admin.scolarshipassigns.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.scolarshipassigns.index');
    $breadcrumbs->push(_tr('menus.backend.scolarshipassigns.create'), route('admin.scolarshipassigns.create'));
});

Breadcrumbs::register('admin.scolarshipassigns.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.scolarshipassigns.index');
    $breadcrumbs->push(_tr('menus.backend.scolarshipassigns.edit'), route('admin.scolarshipassigns.edit', $id));
});

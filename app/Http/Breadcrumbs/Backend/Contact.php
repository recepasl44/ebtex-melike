<?php

Breadcrumbs::register('admin.contacts.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.contacts_management'), route('admin.contacts.index'));
});

Breadcrumbs::register('admin.contacts.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.contacts.index');
    $breadcrumbs->push(_tr('menus.backend.contacts.create'), route('admin.contacts.create'));
});

Breadcrumbs::register('admin.contacts.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.contacts.index');
    $breadcrumbs->push(_tr('menus.backend.contacts.edit'), route('admin.contacts.edit', $id));
});

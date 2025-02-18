<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});


// Broadcast::channel('chat', function ($user) {
//     return true; // Allow only authenticated users
// });

Broadcast::channel('chat.{id}', function ($user) {
    return (int) $user->id === (int) $id; // Ensure the user can access their own private channel
});